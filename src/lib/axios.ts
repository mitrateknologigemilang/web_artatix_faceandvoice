import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 30000, // 30s — file uploads bisa besar
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		// Auth token
		const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Jika body adalah FormData, biarkan browser set Content-Type + boundary
		if (config.data instanceof FormData) {
			delete config.headers["Content-Type"];
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Bisa ditambah global error handling di sini (toast, dll)
		console.error("API Error:", error?.response?.data || error.message);
		return Promise.reject(error);
	},
);

export default api;
