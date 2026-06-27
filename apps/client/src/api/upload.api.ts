import { api } from "@/services/axios";
import axios from "axios";

type CloudinarySignature = {
	signature: string;
	timestamp: number;
};

export const getCloudinarySignature = () => {
	return api.post<CloudinarySignature>(
		"/api/client-system/client/upload/signature",
	);
};

export const uploadToCloudinary = async (
	file: File,
	signature: string,
	timestamp: number,
	apiKey: string,
	cloudName: string,
) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("signature", signature);
	formData.append("timestamp", String(timestamp));
	formData.append("api_key", apiKey);
	formData.append("folder", "venues");

	const response = await axios.post(
		`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
		formData,
	);

	return response.data;
};
