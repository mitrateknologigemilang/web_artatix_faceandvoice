"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/navigation";
import { PermissionPopup } from "./components/PermissionPopup";
import type { TicketDetail } from "@/services/verification.service";

export type VerificationStep = "ticket" | "face" | "sound";

const STORAGE_KEY = "artatix_verification";
const TTL_MS = 24 * 60 * 60 * 1000; // clear after 1 day of inactivity

export const STEP_ROUTE: Record<VerificationStep, string> = {
	ticket: "/verification/ticket",
	face: "/verification/face",
	sound: "/verification/sound",
};

interface PersistShape {
	step: VerificationStep;
	kodeTiket: string | null;
	ticketDetail: TicketDetail | null;
	faceImage: string | null; // data URL — Blob isn't serializable
	updatedAt: number;
}

interface VerificationContextType {
	step: VerificationStep;
	setStep: (s: VerificationStep) => void;
	kodeTiket: string | null;
	setKodeTiket: (code: string | null) => void;
	ticketDetail: TicketDetail | null;
	setTicketDetail: (detail: TicketDetail | null) => void;
	faceBlob: Blob | null;
	setFaceBlob: (blob: Blob | null) => void;
	permissionGrantedTime: number | null;
	setPermissionGrantedTime: (time: number | null) => void;
	clearVerification: () => void;
	hydrated: boolean;
}

const VerificationContext = createContext<VerificationContextType>({
	step: "ticket",
	setStep: () => {},
	kodeTiket: null,
	setKodeTiket: () => {},
	ticketDetail: null,
	setTicketDetail: () => {},
	faceBlob: null,
	setFaceBlob: () => {},
	permissionGrantedTime: null,
	setPermissionGrantedTime: () => {},
	clearVerification: () => {},
	hydrated: false,
});

/** Blob → data URL (for persisting the captured face image). */
function blobToDataURL(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

/** data URL → Blob (for restoring the face image on reload). */
function dataURLtoBlob(dataURL: string): Blob {
	const arr = dataURL.split(",");
	const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
	const bstr = atob(arr[1]);
	const u8 = new Uint8Array(bstr.length);
	for (let i = 0; i < bstr.length; i++) u8[i] = bstr.charCodeAt(i);
	return new Blob([u8], { type: mime });
}

export function VerificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [step, setStep] = useState<VerificationStep>("ticket");
	const [kodeTiket, setKodeTiket] = useState<string | null>(null);
	const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
	const [faceBlob, setFaceBlobState] = useState<Blob | null>(null);
	const [faceImage, setFaceImage] = useState<string | null>(null);
	const [permissionGrantedTime, setPermissionGrantedTime] = useState<
		number | null
	>(null);
	const [hydrated, setHydrated] = useState(false);

	// Keep the Blob and its data-URL form in sync.
	const setFaceBlob = useCallback((blob: Blob | null) => {
		setFaceBlobState(blob);
		if (!blob) {
			setFaceImage(null);
			return;
		}
		blobToDataURL(blob)
			.then(setFaceImage)
			.catch(() => setFaceImage(null));
	}, []);

	const clearVerification = useCallback(() => {
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
		setStep("ticket");
		setKodeTiket(null);
		setTicketDetail(null);
		setFaceBlobState(null);
		setFaceImage(null);
	}, []);

	// Hydrate from localStorage once on mount.
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const d = JSON.parse(raw) as PersistShape;
				if (Date.now() - (d.updatedAt ?? 0) > TTL_MS) {
					// Expired — drop stale progress.
					localStorage.removeItem(STORAGE_KEY);
				} else {
					setStep(d.step ?? "ticket");
					setKodeTiket(d.kodeTiket ?? null);
					setTicketDetail(d.ticketDetail ?? null);
					if (d.faceImage) {
						setFaceImage(d.faceImage);
						setFaceBlobState(dataURLtoBlob(d.faceImage));
					}
				}
			}
		} catch {}
		setHydrated(true);
	}, []);

	// Persist on every change (after hydration so we don't clobber stored data).
	// When nothing meaningful is stored (fresh start / after clear), remove the
	// key entirely rather than writing an empty record.
	useEffect(() => {
		if (!hydrated) return;
		try {
			const isEmpty =
				step === "ticket" && !kodeTiket && !ticketDetail && !faceImage;
			if (isEmpty) {
				localStorage.removeItem(STORAGE_KEY);
				return;
			}
			const data: PersistShape = {
				step,
				kodeTiket,
				ticketDetail,
				faceImage,
				updatedAt: Date.now(),
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} catch {}
	}, [hydrated, step, kodeTiket, ticketDetail, faceImage]);

	return (
		<VerificationContext.Provider
			value={{
				step,
				setStep,
				kodeTiket,
				setKodeTiket,
				ticketDetail,
				setTicketDetail,
				faceBlob,
				setFaceBlob,
				permissionGrantedTime,
				setPermissionGrantedTime,
				clearVerification,
				hydrated,
			}}>
			<PermissionPopup />
			{children}
		</VerificationContext.Provider>
	);
}

export function useVerification() {
	return useContext(VerificationContext);
}

/**
 * Guard a step page. Redirects to the saved step when the user lands here out
 * of order (direct URL / refresh). "Kembali" buttons update `step` first, so
 * intentional back navigation still passes.
 * Returns true once hydrated and this page is the allowed step.
 */
export function useVerificationGuard(pageStep: VerificationStep) {
	const { step, hydrated } = useVerification();
	const router = useRouter();

	useEffect(() => {
		if (!hydrated) return;
		if (pageStep !== step) {
			router.replace(STEP_ROUTE[step]);
		}
	}, [hydrated, step, pageStep, router]);

	return hydrated && pageStep === step;
}
