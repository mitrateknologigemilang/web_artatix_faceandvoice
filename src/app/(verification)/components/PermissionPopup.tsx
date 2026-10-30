"use client";

import React, { useEffect, useState } from "react";
import { Camera, ShieldAlert } from "lucide-react";
import { useVerification } from "../VerificationContext";
import { Modal } from "./Modal";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

/**
 * Try getUserMedia with fallback constraints for broader compatibility.
 * Safari may not support certain constraints like facingMode on desktop.
 */
async function tryGetUserMedia(): Promise<MediaStream> {
	const constraints: MediaStreamConstraints[] = [
		{ video: { facingMode: { ideal: "user" } } },
		{ video: true },
	];

	let lastError: unknown;
	for (const constraint of constraints) {
		try {
			return await navigator.mediaDevices.getUserMedia(constraint);
		} catch (err: any) {
			lastError = err;
			// Only retry on constraint-related errors, not permission denials
			if (
				err.name === "NotAllowedError" ||
				err.name === "PermissionDeniedError"
			) {
				throw err;
			}
			// OverconstrainedError, NotFoundError, etc → try next constraint
		}
	}
	throw lastError;
}

async function releaseMediaStream(stream: MediaStream) {
	stream.getTracks().forEach((track) => track.stop());
	// Some mobile camera drivers need a moment before another page can acquire
	// the camera without returning a live-but-black stream.
	await new Promise((resolve) => setTimeout(resolve, 900));
}

export function PermissionPopup() {
	const [show, setShow] = useState(false);
	const [denied, setDenied] = useState(false);
	const [isChecking, setIsChecking] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const { setPermissionGrantedTime } = useVerification();

	useEffect(() => {
		checkExistingPermissions();
	}, []);

	/**
	 * Check if camera & mic permissions are already granted.
	 * - Chrome/Edge: uses the Permissions API
	 * - Safari/Firefox: falls back to a quick getUserMedia probe
	 */
	async function checkExistingPermissions() {
		try {
			if (!navigator.mediaDevices?.getUserMedia) {
				// No media device support at all
				setDenied(true);
				setIsChecking(false);
				setShow(true);
				return;
			}

			// Try the Permissions API first (Chrome, Edge)
			if (navigator.permissions?.query) {
				try {
					const camResult = await navigator.permissions.query({
						name: "camera" as PermissionName,
					});

					if (camResult.state === "granted") {
						// Already granted — skip popup
						setPermissionGrantedTime(Date.now());
						setIsChecking(false);
						return;
					}

					if (camResult.state === "denied") {
						setDenied(true);
						setShow(true);
						setIsChecking(false);
						return;
					}

					// state === "prompt" → show the popup
					setShow(true);
					setIsChecking(false);
					return;
				} catch {
					// permissions.query threw (Safari doesn't support camera/mic query)
					// Fall through to probe approach
				}
			}

			// Fallback for Safari: do a quick getUserMedia probe
			try {
				const stream = await tryGetUserMedia();
				await releaseMediaStream(stream);
				// Permission was already granted (or user just granted it)
				setPermissionGrantedTime(Date.now());
				setIsChecking(false);
				return;
			} catch (err: any) {
				if (
					err.name === "NotAllowedError" ||
					err.name === "PermissionDeniedError"
				) {
					// On Safari, NotAllowedError during a non-user-gesture call
					// means permission hasn't been granted yet → show popup
					setShow(true);
					setIsChecking(false);
					return;
				}
				// Other error (no camera, etc.)
				setDenied(true);
				setShow(true);
				setIsChecking(false);
			}
		} catch {
			// Unexpected error
			setShow(true);
			setIsChecking(false);
		}
	}

	const requestPermission = async () => {
		try {
			if (!navigator.mediaDevices?.getUserMedia) {
				setDenied(true);
				return;
			}

			const stream = await tryGetUserMedia();

			// Stop tracks — we only needed to trigger the permission prompt
			await releaseMediaStream(stream);

			setShow(false);
			setDenied(false);
			setPermissionGrantedTime(Date.now());
		} catch (e: any) {
			console.error("Error requesting permissions", e);

			if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
				setDenied(true);
				setShow(true);
			} else if (e.name === "NotFoundError" || e.name === "NotReadableError") {
				// No camera hardware found, or device is in use
				setDenied(true);
				setShow(true);
			} else {
				setErrorMsg("Gagal mengakses kamera.");
			}
		}
	};

	if (isChecking || !show) {
		return (
			<Modal
				open={!!errorMsg}
				onClose={() => setErrorMsg(null)}
				title="Terjadi Kesalahan"
				description={errorMsg}
			/>
		);
	}

	return (
		<>
			<Modal
				open={!!errorMsg}
				onClose={() => setErrorMsg(null)}
				title="Terjadi Kesalahan"
				description={errorMsg}
			/>
			<Sheet open={show}>
				<SheetContent
					side="bottom"
					showCloseButton={false}
					onInteractOutside={(e) => e.preventDefault()}
					onEscapeKeyDown={(e) => e.preventDefault()}
					className="mx-auto w-full max-w-md rounded-t-3xl border-t-0 bg-white px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl">
					<div className="mx-auto mb-1 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />
					<div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-1 relative">
						<Camera className="w-6 h-6 text-[#3b5bdb]" />
					</div>

					<SheetHeader className="p-0 text-center">
						<SheetTitle className="text-lg font-bold text-center text-[#1e2a4a]">
							{denied ? "Akses Ditolak" : "Izin Kamera Dibutuhkan"}
						</SheetTitle>
						<SheetDescription className="text-slate-500 text-sm text-center mt-1 leading-relaxed">
							{denied
								? "Anda telah menolak akses kamera. Mohon ubah pengaturan situs di browser Anda untuk memberikan izin, lalu muat ulang halaman."
								: "Untuk melanjutkan verifikasi biometrik, kami membutuhkan akses ke kamera perangkat Anda."}
						</SheetDescription>
					</SheetHeader>

					{denied ? (
						<div className="mt-2 bg-red-50 text-red-600 text-sm rounded-xl p-3.5 flex flex-col gap-2 border border-red-100">
							<div className="flex items-start gap-2">
								<ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
								<p className="text-xs leading-relaxed">
									Silakan buka pengaturan situs (ikon gembok di URL bar) dan
									izinkan Kamera.
								</p>
							</div>
							<button
								onClick={() => window.location.reload()}
								className="mt-1.5 text-sm font-semibold bg-white border border-red-200 text-red-600 h-10 rounded-xl hover:bg-red-50 transition-colors">
								Muat Ulang Halaman
							</button>
						</div>
					) : (
						<button
							onClick={requestPermission}
							className="mt-2 w-full bg-[#3b5bdb] text-white font-semibold text-sm h-11 rounded-xl hover:bg-[#3451c5] active:scale-[0.99] transition-all shadow-sm">
							Izinkan Akses Kamera
						</button>
					)}
				</SheetContent>
			</Sheet>
		</>
	);
}
