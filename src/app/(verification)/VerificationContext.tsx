"use client";

import React, { createContext, useContext, useState } from "react";

interface VerificationContextType {
	kodeTiket: string | null;
	setKodeTiket: (code: string | null) => void;
	faceBlob: Blob | null;
	setFaceBlob: (blob: Blob | null) => void;
	permissionGrantedTime: number | null;
	setPermissionGrantedTime: (time: number | null) => void;
}

const VerificationContext = createContext<VerificationContextType>({
	kodeTiket: null,
	setKodeTiket: () => {},
	faceBlob: null,
	setFaceBlob: () => {},
	permissionGrantedTime: null,
	setPermissionGrantedTime: () => {},
});

import { PermissionPopup } from "./components/PermissionPopup";

export function VerificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [kodeTiket, setKodeTiket] = useState<string | null>(null);
	const [faceBlob, setFaceBlob] = useState<Blob | null>(null);
	const [permissionGrantedTime, setPermissionGrantedTime] = useState<
		number | null
	>(null);

	return (
		<VerificationContext.Provider
			value={{
				kodeTiket,
				setKodeTiket,
				faceBlob,
				setFaceBlob,
				permissionGrantedTime,
				setPermissionGrantedTime,
			}}>
			<PermissionPopup />
			{children}
		</VerificationContext.Provider>
	);
}

export function useVerification() {
	return useContext(VerificationContext);
}
