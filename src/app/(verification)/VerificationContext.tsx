"use client";

import React, { createContext, useContext, useState } from "react";

interface VerificationContextType {
	faceBlob: Blob | null;
	setFaceBlob: (blob: Blob | null) => void;
}

const VerificationContext = createContext<VerificationContextType>({
	faceBlob: null,
	setFaceBlob: () => {},
});

export function VerificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [faceBlob, setFaceBlob] = useState<Blob | null>(null);

	return (
		<VerificationContext.Provider value={{ faceBlob, setFaceBlob }}>
			{children}
		</VerificationContext.Provider>
	);
}

export function useVerification() {
	return useContext(VerificationContext);
}
