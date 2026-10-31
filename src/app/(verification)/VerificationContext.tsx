"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { PermissionPopup } from "./components/PermissionPopup";
import type { TicketDetail } from "@/services/verification.service";

export type VerificationStep = "ticket" | "face" | "sound" | "success";

interface VerificationContextType {
	step: VerificationStep;
	setStep: (s: VerificationStep) => void;
	ticketCode: string;
	setTicketCode: (code: string) => void;
	nik: string;
	setNik: (nik: string) => void;
	uploadMode: boolean;
	setUploadMode: (mode: boolean) => void;
	ticketDetail: TicketDetail | null;
	setTicketDetail: (detail: TicketDetail | null) => void;
	faceBlob: Blob | null;
	setFaceBlob: (blob: Blob | null) => void;
	permissionGrantedTime: number | null;
	setPermissionGrantedTime: (time: number | null) => void;
	clearVerification: () => void;
}

const VerificationContext = createContext<VerificationContextType>({
	step: "ticket",
	setStep: () => {},
	ticketCode: "",
	setTicketCode: () => {},
	nik: "",
	setNik: () => {},
	uploadMode: false,
	setUploadMode: () => {},
	ticketDetail: null,
	setTicketDetail: () => {},
	faceBlob: null,
	setFaceBlob: () => {},
	permissionGrantedTime: null,
	setPermissionGrantedTime: () => {},
	clearVerification: () => {},
});

export function VerificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [step, setStep] = useState<VerificationStep>("ticket");
	const [ticketCode, setTicketCode] = useState<string>("");
	const [nik, setNik] = useState<string>("");
	const [uploadMode, setUploadMode] = useState<boolean>(false);
	const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
	const [faceBlob, setFaceBlob] = useState<Blob | null>(null);
	const [permissionGrantedTime, setPermissionGrantedTime] = useState<
		number | null
	>(null);

	const router = useRouter();
	const pathname = usePathname();

	const clearVerification = useCallback(() => {
		setStep("ticket");
		setTicketCode("");
		setNik("");
		setUploadMode(false);
		setTicketDetail(null);
		setFaceBlob(null);
	}, []);

	// Normalize any legacy sub-route (/verification/ticket, /face, /success) to /verification
	useEffect(() => {
		if (pathname && pathname !== "/verification") {
			router.replace("/verification");
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
				uploadMode,
				setUploadMode,
				ticketDetail,
				setTicketDetail,
				faceBlob,
				setFaceBlob,
				permissionGrantedTime,
				setPermissionGrantedTime,
				clearVerification,
			}}>
			<PermissionPopup />
			{children}
		</VerificationContext.Provider>
	);
}

export function useVerification() {
	return useContext(VerificationContext);
}
