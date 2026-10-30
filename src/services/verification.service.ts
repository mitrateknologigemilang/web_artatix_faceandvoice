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
		(value): value is string =>
			typeof value === "string" && value.trim() !== "",
	);

	return message || fallback;
}

/**
 * Validate a ticket code against the backend.
 * Returns the detail and registration status, or null when the ticket doesn't exist.
 * Throws only on unexpected (network/server) errors.
 */
export async function getTicketDetail(
	ticketTag: string,
	nik: string,
): Promise<TicketLookupResult | null> {
	try {
		const res = await api.get(
			`/api/ref/getDetailTiket?kode=${encodeURIComponent(ticketTag)}&nik=${encodeURIComponent(nik)}`,
		);
		const payload = res.data?.data;

		if (payload?.message === "success" && payload?.data) {
			return {
				detail: payload.data as TicketDetail,
				registered: Boolean(payload.registered),
			};
		}

		const message = payload?.message || res.data?.message;
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
	ticketTag: string;
	nik: string;
	file_wajah: Blob;
}

export async function submitBiometricData(payload: SubmitBiometricPayload) {
	const formData = new FormData();

	formData.append("ticketCode", payload.ticketTag);
	formData.append("nik", payload.nik);
	formData.append("file_wajah", payload.file_wajah, "face.jpg");

	const response = await api.post("/api/ref/registerDataDiri", formData);

	return response.data;
}
