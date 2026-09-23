"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { PermissionPopup } from "./components/PermissionPopup";
import type { TicketDetail } from "@/services/verification.service";

export type VerificationStep = "ticket" | "face" | "sound";

const STORAGE_KEY = "artatix_verification";

export const STEP_ROUTE: Record<VerificationStep, string> = {
	ticket: "/verification/ticket",
	face: "/verification/face",
	sound: "/verification/sound",
};

interface VerificationContextType {
	step: VerificationStep;
	setStep: (s: VerificationStep) => void;
	ticketCode: string | null;
	setTicketCode: (code: string | null) => void;
	nik: string | null;
	setNik: (nik: string | null) => void;
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
	ticketCode: null,
	setTicketCode: () => {},
	nik: null,
	setNik: () => {},
	ticketDetail: null,
	setTicketDetail: () => {},
	faceBlob: null,
	setFaceBlob: () => {},
	permissionGrantedTime: null,
	setPermissionGrantedTime: () => {},
	clearVerification: () => {},
	hydrated: false,
});

export function VerificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [step, setStep] = useState<VerificationStep>("ticket");
	const [ticketCode, setTicketCode] = useState<string | null>(null);
	const [nik, setNik] = useState<string | null>(null);
	const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
	const [faceBlob, setFaceBlobState] = useState<Blob | null>(null);
	const [permissionGrantedTime, setPermissionGrantedTime] = useState<
		number | null
	>(null);
	const [hydrated, setHydrated] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const initializedRef = useRef(false);

	const setFaceBlob = useCallback((blob: Blob | null) => {
		setFaceBlobState(blob);
	}, []);

	const clearVerification = useCallback(() => {
		try {
			localStorage.removeItem(STORAGE_KEY);
			sessionStorage.removeItem(STORAGE_KEY);
		} catch {}
		setStep("ticket");
		setTicketCode(null);
		setNik(null);
		setTicketDetail(null);
		setFaceBlobState(null);
	}, []);

	// A fresh page load always starts a new verification flow.
	useEffect(() => {
		if (initializedRef.current) return;
		initializedRef.current = true;

		try {
			localStorage.removeItem(STORAGE_KEY);
			sessionStorage.removeItem(STORAGE_KEY);
		} catch {}
		setHydrated(true);

		if (pathname !== STEP_ROUTE.ticket) {
			router.replace(STEP_ROUTE.ticket);
		}
	}, [pathname, router]);

	return (
		<VerificationContext.Provider
			value={{
				step,
				setStep,
				ticketCode,
				setTicketCode,
				nik,
				setNik,
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
