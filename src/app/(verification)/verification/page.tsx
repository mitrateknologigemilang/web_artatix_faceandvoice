"use client";

import { useVerification } from "../VerificationContext";
import TicketVerificationPage from "./ticket/page";
import FaceVerificationPage from "./face/page";
import VerificationSuccessPage from "./success/page";

export default function VerificationPage() {
	const { step } = useVerification();

	if (step === "face") return <FaceVerificationPage />;
	if (step === "success") return <VerificationSuccessPage />;
	return <TicketVerificationPage />;
}
