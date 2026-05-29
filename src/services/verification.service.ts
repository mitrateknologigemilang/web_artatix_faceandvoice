import api from "@/lib/axios";

interface SubmitBiometricPayload {
	ticketCode: string;
	file_wajah: Blob;
	file_suara: Blob;
}

export async function submitBiometricData(payload: SubmitBiometricPayload) {
	console.log(
		"🚀 ~ verification.service.ts:14 ~ submitBiometricData ~ payload:",
		payload,
	);
	const formData = new FormData();

	formData.append("ticketCode", payload.ticketCode);
	formData.append("file_wajah", payload.file_wajah, "face.jpg");
	formData.append("file_suara", payload.file_suara, "sound.wav");

	const response = await api.post("/api/ref/registerDataDiri", formData);
	return response.data;
}
4