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

export interface TicketLookupResult {
	detail: TicketDetail;
	registered: boolean;
}

export function getApiErrorMessage(
	error: unknown,
	fallback = "Terjadi kesalahan. Silakan coba lagi.",
): string {
	if (!axios.isAxiosError(error)) {
		return error instanceof Error && error.message ? error.message : fallback;
	}

	const data = error.response?.data;
	const candidates = [
		data?.data?.data?.message,
		data?.data?.message,
		data?.message,
		error.message,
	];
	const message = candidates.find(
		(value): value is string => typeof value === "string" && value.trim() !== "",
	);

	return message || fallback;
}

/**
 * Validate a ticket code against the backend.
 * Returns the detail and registration status, or null when the ticket doesn't exist.
 * Throws only on unexpected (network/server) errors.
 */
export async function getTicketDetail(
	ticketCode: string,
): Promise<TicketLookupResult | null> {
	try {
		const res = await api.get(
			`/api/ref/getDetailTiket?kode=${encodeURIComponent(ticketCode)}`,
		);
		if (res.data?.data?.message === "success" && res.data?.data?.data) {
			return {
				detail: res.data.data.data as TicketDetail,
				registered: res.data.data.registered === true,
			};
		}
		const message =
			res.data?.data?.message || res.data?.message || "Kode tiket tidak ditemukan.";
		if (typeof message === "string" && message.toLowerCase() !== "not found") {
			throw new Error(message);
		}
		return null;
	} catch (err) {
		// 404 → ticket not found (expected), anything else → rethrow
		if (axios.isAxiosError(err) && err.response?.status === 404) {
			return null;
		}
		throw err;
	}
}

export interface SubmitBiometricPayload {
	ticketCode: string;
	file_wajah: Blob;
	file_suara?: Blob;
}

export async function submitBiometricData(payload: SubmitBiometricPayload) {
	const formData = new FormData();

	formData.append("ticketCode", payload.ticketCode);
	formData.append("file_wajah", payload.file_wajah, "face.jpg");
	if (payload.file_suara) {
		formData.append("file_suara", payload.file_suara, "sound.wav");
	}

	const response = await api.post("/api/ref/registerDataDiri", formData);
	return response.data;
}
