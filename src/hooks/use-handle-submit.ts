import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { SubmitBiometricPayload } from "@/services/verification.service";
// atau import router sesuai framework kamu

export function useHandleSubmit({
	faceBlob,
	kodeTiket,
	errorMsg,
	setErrorMsg,
	setSubmitting,
	submitBiometricData,
	getApiErrorMessage,
}: {
	faceBlob: Blob | null;
	kodeTiket: string | null;
	errorMsg: string | null;
	setErrorMsg: (msg: string | null) => void;
	setSubmitting: (submitting: boolean) => void;
	submitBiometricData: (payload: SubmitBiometricPayload) => Promise<any>;
	getApiErrorMessage: (error: unknown, fallback?: string) => string;
}) {
	const router = useRouter();

	const handleSubmit = useCallback(async () => {
		if (!faceBlob) {
			setErrorMsg("Data wajah belum tersedia.");
			return;
		}

		if (!kodeTiket) {
			setErrorMsg("Kode tiket belum tersedia. Silakan kembali ke langkah 1.");
			return;
		}

		setSubmitting(true);

		try {
			await submitBiometricData({
				ticketCode: kodeTiket,
				file_wajah: faceBlob,
			});

			router.replace("/verification/success");
		} catch (error) {
			console.error("Submit error:", error);

			setErrorMsg(
				getApiErrorMessage(error, "Gagal mengirim data. Silakan coba lagi."),
			);
		} finally {
			setSubmitting(false);
		}
	}, [
		faceBlob,
		kodeTiket,
		setErrorMsg,
		setSubmitting,
		submitBiometricData,
		getApiErrorMessage,
		router,
	]);

	const handleErrorClose = useCallback(() => {
		const wasMissingTicket =
			errorMsg === "Kode tiket belum tersedia. Silakan kembali ke langkah 1.";

		setErrorMsg(null);

		if (wasMissingTicket) {
			router.push("/verification/ticket");
		}
	}, [errorMsg, setErrorMsg, router]);

	return {
		handleSubmit,
		handleErrorClose,
	};
}
