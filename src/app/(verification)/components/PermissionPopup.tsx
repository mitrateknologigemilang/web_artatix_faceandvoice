"use client";

import React, { useEffect, useState } from "react";
import { Camera, Mic, ShieldAlert } from "lucide-react";
import { useVerification } from "../VerificationContext";
import { Modal } from "./Modal";

/**
 * Try getUserMedia with fallback constraints for broader compatibility.
 * Safari may not support certain constraints like facingMode on desktop.
 */
async function tryGetUserMedia(): Promise<MediaStream> {
	const constraints: MediaStreamConstraints[] = [
		{ video: { facingMode: { ideal: "user" } }, audio: true },
		{ video: true, audio: true },
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
					const [camResult, micResult] = await Promise.all([
						navigator.permissions.query({
							name: "camera" as PermissionName,
						}),
						navigator.permissions.query({
							name: "microphone" as PermissionName,
						}),
					]);

					if (camResult.state === "granted" && micResult.state === "granted") {
						// Already granted — skip popup
						setPermissionGrantedTime(Date.now());
						setIsChecking(false);
						return;
					}

					if (camResult.state === "denied" || micResult.state === "denied") {
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
				stream.getTracks().forEach((t) => t.stop());
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
			stream.getTracks().forEach((t) => t.stop());

			setShow(false);
			setDenied(false);
			setPermissionGrantedTime(Date.now());
		} catch (e: any) {
			console.error("Error requesting permissions", e);

			if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
				setDenied(true);
				setShow(true);
			} else if (e.name === "NotFoundError" || e.name === "NotReadableError") {
				// No camera/mic hardware found, or device is in use
				setDenied(true);
				setShow(true);
			} else {
				setErrorMsg("Gagal mengakses kamera/mikrofon.");
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
			<div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
				style={{ zIndex: 9999 }}>
				<div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
					<div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
						<Camera className="w-6 h-6 text-[#3b5bdb] absolute -ml-4 -mt-2" />
						<Mic className="w-6 h-6 text-[#3b5bdb] absolute ml-4 mt-2" />
					</div>

					<h2 className="text-xl font-bold text-center text-[#1e2a4a] mb-2">
						{denied ? "Akses Ditolak" : "Izin Dibutuhkan"}
					</h2>

					<p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
						{denied
							? "Anda telah menolak akses kamera atau mikrofon. Mohon ubah pengaturan situs di browser Anda untuk memberikan izin, lalu muat ulang halaman."
							: "Untuk melanjutkan verifikasi biometrik, kami membutuhkan akses ke kamera dan mikrofon Anda."}
					</p>

					{denied ? (
						<div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 flex flex-col gap-2">
							<div className="flex items-start gap-2">
								<ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
								<p>
									Silakan buka pengaturan situs (ikon gembok di URL bar) dan
									izinkan Kamera & Mikrofon.
								</p>
							</div>
							<button
								onClick={() => window.location.reload()}
								className="mt-2 text-sm font-medium bg-white border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors">
								Muat Ulang Halaman
							</button>
						</div>
					) : (
						<button
							onClick={requestPermission}
							className="w-full bg-[#3b5bdb] text-white font-medium py-3 rounded-xl hover:bg-[#3451c5] transition-colors shadow-sm">
							Izinkan Akses
						</button>
					)}
				</div>
			</div>
		</>
	);
}
