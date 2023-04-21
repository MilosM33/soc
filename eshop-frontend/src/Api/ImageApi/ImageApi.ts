import { post } from "../Client";

export const ImageApi = {
	uploadImage: (formdata: any) =>
		post("/admin/uploadfile", formdata, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
};
