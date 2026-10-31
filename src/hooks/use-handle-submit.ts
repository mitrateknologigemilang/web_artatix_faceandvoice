import { useCallback, useState } from "react";
import axios from "axios";
import { SubmitBiometricPayload } from "@/services/verification.service";
import { useVerification } from "@/app/(verification)/VerificationContext";

export type SubmitFailureStage = "ticket" | "face" | "retry" | null;

function detectFailureStage(error: unknown, message: string): SubmitFailureStage {
	const normalized = message.toLowerCase();

	// Jika pesan error berkaitan dengan tiket atau NIK (tidak ditemukan, tidak sesuai, sudah terdaftar)
	const isTicketOrNikError =
		/\b(tiket|ticket|kode|nik|identitas|ktp)\b/i.test(normalized) ||
		(/\b(terdaftar|teregistrasi|registered)\b/i.test(normalized) &&
			!/\b(wajah|face|foto|photo)\b/i.test(normalized));

	if (isTicketOrNikError) {
		return "ticket";
	}

	// Jika error karena masalah jaringan / timeout / server 5xx, tetap di halaman konfirmasi agar bisa coba kirim ulang
	if (
		axios.isAxiosError(error) &&
		(!error.response ||
			error.response.status >= 500 ||
			error.code === "ECONNABORTED")
	) {
		return "retry";
	}

	// Default untuk kegagalan validasi biometrik / foto wajah: ulangi pengambilan foto wajah
	return "face";
}

export function useHandleSubmit({
	faceBlob,
	ticketCode,
	nik,
	errorMsg,
	setErrorMsg,
	setSubmitting,
	submitBiometricData,
	getApiErrorMessage,
	onTicketError,
	onFaceError,
}: {
	faceBlob: Blob | null;
	ticketCode: string | null;
	nik: string | null;
	errorMsg: string | null;
	setErrorMsg: (msg: string | null) => void;
	setSubmitting: (submitting: boolean) => void;
	submitBiometricData: (payload: SubmitBiometricPayload) => Promise<any>;
	getApiErrorMessage: (error: unknown, fallback?: string) => string;
	onTicketError?: () => void;
	onFaceError?: () => void;
}) {
	const { setStep } = useVerification();
	const [failureStage, setFailureStage] = useState<SubmitFailureStage>(null);

	const submit = useCallback(
		async (face: Blob | null) => {
			if (!ticketCode) {
				setFailureStage("ticket");
				setErrorMsg("Kode tiket belum tersedia. Silakan kembali ke langkah 1.");
				return false;
			}

			if (!nik) {
				setFailureStage("ticket");
				setErrorMsg(
					"NIK belum tersedia. Silakan lengkapi data tiket terlebih dahulu.",
				);
				return false;
			}

			if (!face) {
				setFailureStage("face");
				setErrorMsg("Data wajah belum tersedia. Silakan ambil foto kembali.");
				return false;
			}

			setSubmitting(true);

			try {
				await submitBiometricData({
					ticketTag: ticketCode,
					nik,
					file_wajah: face,
				});

				setFailureStage(null);
				setStep("success");
				return true;
			} catch (error) {
				console.error("Submit error:", error);

				const message = getApiErrorMessage(
					error,
					"Gagal mengirim data. Silakan coba lagi.",
				);
				setFailureStage(detectFailureStage(error, message));
				setErrorMsg(message);
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
			setStep,
		],
	);

	const handleSubmit = useCallback(() => submit(faceBlob), [faceBlob, submit]);

	const handleSubmitWithFaceBlob = useCallback(
		(face: Blob) => submit(face),
		[submit],
	);

	const handleErrorClose = useCallback(() => {
		const currentMsg = errorMsg ?? "";
		const stage =
			failureStage ?? detectFailureStage(undefined, currentMsg);

		setErrorMsg(null);
		setFailureStage(null);

		if (stage === "ticket") {
			if (onTicketError) {
				onTicketError();
			} else {
				setStep("ticket");
			}
			return;
		}

		if (stage === "face") {
			onFaceError?.();
		}
	}, [errorMsg, failureStage, onFaceError, onTicketError, setErrorMsg, setStep]);

	return {
		handleSubmit,
		handleSubmitWithFaceBlob,
		handleErrorClose,
		failureStage,
	};
}
