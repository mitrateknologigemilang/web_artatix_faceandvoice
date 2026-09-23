import axios from "axios";
import api from "@/lib/axios";

export interface TicketDetail {
	valid: string;
	ticketTag: string;
	ticketStatus: string;
	ownerName: string;
	ticketCategory: string;
	ticketName: string;
	orderTag: string;
	eventName: string;
	eventLocation: string;
	validationMode: "scan" | "face" | "both";
	allowedValidation: ("scan" | "face")[];
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
			`/api/validate_tiket/check/${encodeURIComponent(ticketTag)}/${encodeURIComponent(nik)}`,
		);
		const data = res.data?.data ?? [];
		const message = res.data?.message;

		console.log("🚀 ~ getTicketDetail ~ res:", data);

		if (message === "Tiket valid" && res.data?.data) {
			return {
				detail: {
					valid: data.valid,
					ticketTag: data.tiket_tag,
					ticketStatus: data.tiket_status,
					ownerName: data.owner_name,
					ticketCategory: data.ticket_category,
					ticketName: data.ticket_name,
					orderTag: data.order_tag,
					eventName: data.event_name,
					eventLocation: data.event_location,
					validationMode: data.validation_mode,
					allowedValidation: data.allowed_validation,
				} as TicketDetail,
				registered: data.tiket_status === "used",
			};
		}

		// const message =
		// 	res.data?.data?.message ||
		// 	res.data?.message ||
		// 	"Kode tiket tidak ditemukan.";

		// if (typeof message === "string" && message.toLowerCase() !== "not found") {
		// 	throw new Error(message);
		// }
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

	formData.append("tiket_tag", payload.ticketTag);
	formData.append("nik", payload.nik);
	formData.append("file_wajah", payload.file_wajah, "face.jpg");

	const response = await api.post("/api/validate_tiket/face", formData);
	return response.data;
}
