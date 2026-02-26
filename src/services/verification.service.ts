import api from "@/lib/axios";

interface SubmitBiometricPayload {
	user_uuid: string;
	nik: string;
	nama: string;
	jenis_kelamin: "Pria" | "Wanita";
	file_wajah: Blob;
	file_suara: Blob;
}

export async function submitBiometricData(payload: SubmitBiometricPayload) 
{
    console.log("🚀 ~ verification.service.ts:14 ~ submitBiometricData ~ payload:", payload)
	const formData = new FormData();
	formData.append("user_uuid", payload.user_uuid);
	formData.append("nik", payload.nik);
	formData.append("nama", payload.nama);
	formData.append("jenis_kelamin", payload.jenis_kelamin);
	formData.append("file_wajah", payload.file_wajah, "face.jpg");
	formData.append("file_suara", payload.file_suara, "sound.wav");

	const response = await api.post("/api/data_diri", formData);
	return response.data;
}
