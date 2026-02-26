"use client";

import React, { useEffect, useState } from "react";
import { Camera, Mic, ShieldAlert } from "lucide-react";
import { useVerification } from "../VerificationContext";

export function PermissionPopup() {
	const [show, setShow] = useState(false);
	const [denied, setDenied] = useState(false);
	const [isChecking, setIsChecking] = useState(true);
	const { setPermissionGrantedTime } = useVerification();

	useEffect(() => {
		checkPermissions();
	}, []);

	const checkPermissions = async () => {
		try {
			// Modern browsers support querying 'camera' and 'microphone' permissions
			const cam = await navigator.permissions.query({
				name: "camera" as PermissionName,
			});
			const mic = await navigator.permissions.query({
				name: "microphone" as PermissionName,
			});

			const checkState = () => {
				if (cam.state === "denied" || mic.state === "denied") {
					setDenied(true);
					setShow(true);
				} else if (cam.state !== "granted" || mic.state !== "granted") {
					setShow(true);
					setDenied(false);
				} else {
					setShow(false);
					setDenied(false);
				}
				setIsChecking(false);
			};

			checkState();

			cam.onchange = checkState;
			mic.onchange = checkState;
		} catch (error) {
			// Fallback for browsers that don't support query (e.g. older Safari)
			try {
				const devices = await navigator.mediaDevices.enumerateDevices();
				const hasVideoLabel = devices.some(
					(d) => d.kind === "videoinput" && d.label !== "",
				);
				const hasAudioLabel = devices.some(
					(d) => d.kind === "audioinput" && d.label !== "",
				);

				if (!hasVideoLabel || !hasAudioLabel) {
					setShow(true);
				} else {
					setShow(false);
				}
			} catch (fallbackError) {
				// If enumerateDevices also fails, just show the popup
				setShow(true);
			} finally {
				setIsChecking(false);
			}
		}
	};

	const requestPermission = async () => {
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				setDenied(true);
				alert(
					"Browser Anda tidak mendukung akses kamera/mikrofon, atau koneksi tidak aman (harus HTTPS atau localhost).",
				);
				return;
			}
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			// Stop the stream immediately, because we only wanted to request permission
			stream.getTracks().forEach((track) => track.stop());
			setShow(false);
			setDenied(false);
			setPermissionGrantedTime(Date.now());

			// Refresh permission state
			checkPermissions();
		} catch (e: any) {
			console.error("Error requesting permissions", e);
			if (
				e.name === "NotAllowedError" ||
				e.name === "PermissionDeniedError" ||
				e.message?.includes("Permission denied")
			) {
				setDenied(true);
			} else {
				alert(
					"Gagal mengakses perangkat: " +
						(e.message || "Pastikan Anda menggunakan koneksi aman (HTTPS)."),
				);
				// We can just hide the popup or show a different error
				setShow(false);
			}
		}
	};

	if (isChecking || !show) return null;

	return (
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
	);
}
