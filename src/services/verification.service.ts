import axios from "axios";
import api from "@/lib/axios";

export interface TicketDetail {
	orderId: string;
	status: string;
	detailTransactionDocument: {
		name: string;
		fullname: string;
		generatedIdentityType: string;
		identityNumber: string;
	};
	ticket: {
		category: string;
		ticketCode: string;
	};
}

/**
 * Validate a ticket code against the backend.
 * Returns the detail when found, or null when the ticket doesn't exist.
 * Throws only on unexpected (network/server) errors.
 */
export async function getTicketDetail(
	ticketCode: string,
): Promise<TicketDetail | null> {
	try {
		const res = await api.get(
			`/api/ref/getDetailTiket?kode=${encodeURIComponent(ticketCode)}`,
		);
		if (res.data?.data?.message === "success" && res.data?.data?.data) {
			return res.data.data.data as TicketDetail;
		}
		// e.g. { message: "Not found" }
		return null;
	} catch (err) {
		// 404 → ticket not found (expected), anything else → rethrow
		if (axios.isAxiosError(err) && err.response?.status === 404) {
			return null;
		}
		throw err;
	}
}

interface SubmitBiometricPayload {
	ticketCode: string;
	file_wajah: Blob;
	file_suara?: Blob;
}

export async function submitBiometricData(payload: SubmitBiometricPayload) {
	console.log(
		"🚀 ~ verification.service.ts:14 ~ submitBiometricData ~ payload:",
		payload,
	);
	const formData = new FormData();

	formData.append("ticketCode", payload.ticketCode);
	formData.append("file_wajah", payload.file_wajah, "face.jpg");
	if (payload.file_suara) {
		formData.append("file_suara", payload.file_suara, "sound.wav");
	}

	const response = await api.post("/api/ref/registerDataDiri", formData);
	return response.data;
}
4