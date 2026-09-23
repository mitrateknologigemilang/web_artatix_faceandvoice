import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { SubmitBiometricPayload } from "@/services/verification.service";
// atau import router sesuai framework kamu

export function useHandleSubmit({
	faceBlob,
	ticketCode,
	nik,
	errorMsg,
	setErrorMsg,
	setSubmitting,
	submitBiometricData,
	getApiErrorMessage,
}: {
	faceBlob: Blob | null;
	ticketCode: string | null;
	nik: string | null;
	errorMsg: string | null;
	setErrorMsg: (msg: string | null) => void;
	setSubmitting: (submitting: boolean) => void;
	submitBiometricData: (payload: SubmitBiometricPayload) => Promise<any>;
	getApiErrorMessage: (error: unknown, fallback?: string) => string;
}) {
	const router = useRouter();

	const submit = useCallback(
		async (face: Blob | null) => {
			if (!face) {
				setErrorMsg("Data wajah belum tersedia.");
				return false;
			}

			if (!ticketCode) {
				setErrorMsg("Kode tiket belum tersedia. Silakan kembali ke langkah 1.");
				return false;
			}

			if (!nik) {
				setErrorMsg(
					"NIK belum tersedia. Silakan lengkapi data tiket terlebih dahulu.",
				);
				return false;
			}

			setSubmitting(true);

			try {
				await submitBiometricData({
					ticketTag: ticketCode,
					nik,
					file_wajah: face,
				});

				router.replace("/verification/success");
				return true;
			} catch (error) {
				console.error("Submit error:", error);

				setErrorMsg(
					getApiErrorMessage(error, "Gagal mengirim data. Silakan coba lagi."),
				);
				return false;
			} finally {
				setSubmitting(false);
			}
		},
		[
			ticketCode,
			nik,
			setErrorMsg,
			setSubmitting,
			submitBiometricData,
			getApiErrorMessage,
			router,
		],
	);

	const handleSubmit = useCallback(() => submit(faceBlob), [faceBlob, submit]);

	const handleSubmitWithFaceBlob = useCallback(
		(face: Blob) => submit(face),
		[submit],
	);

	const handleErrorClose = useCallback(() => {
		const wasMissingTicket =
			errorMsg === "Kode tiket belum tersedia. Silakan kembali ke langkah 1." ||
			errorMsg ===
				"NIK belum tersedia. Silakan lengkapi data tiket terlebih dahulu.";

		setErrorMsg(null);

		if (wasMissingTicket) {
			router.push("/verification/ticket");
		}
	}, [errorMsg, setErrorMsg, router]);

	return {
		handleSubmit,
		handleSubmitWithFaceBlob,
		handleErrorClose,
	};
}
