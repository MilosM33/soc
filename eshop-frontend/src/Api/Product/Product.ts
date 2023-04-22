import { get, post } from "../Client";
export const Product = {
	getProductsByPage: (page: number, data?: any) =>
		get("/products?page=" + page, data),
	getProduct: (id: string) => get(`/products/${id}`),
	searchProducts: (query: string) => get(`/products/search/${query}`),

	searchVariants: (query: string, name: string) =>
		get(`/products/${name}/searchvariants/${query}`),

	getRelatedProducts: (slug: string) => get(`/products/related/${slug}`),

	getItemsFromOrder: (id: string) => get(`/admin/orders/getitems/${id}`),
	removeItemFromOrder: (data: any) => post(`/admin/orders/removeitem/`, data),

	updateOrder: (data: any) => post(`/admin/orders/update`, data),

	filterProducts: (data: any) =>
		get("/admin/products/filter", { params: data }),

	getVariants: (name: string) => get(`/products/${name}/variants`),
	addVariant: (data: any) => post("/admin/products/addvariant", data),
	deleteVariant: (data: any) => post("/admin/products/deletevariant", data),

	deleteProduct: (id: string) => post(`/admin/products/delete/${id}`),

	uploadImages: (data: any) =>
		post("/admin/products/uploadimages", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),

	deleteImage: (data: any) => post("/admin/products/deleteimage", data),

	updateProduct: (data: any) => post("/admin/products/update", data),

	generateSlug: (data: any) => post("/admin/products/generateslug", data),

	deleteSimilarProduct: (data: any) =>
		post("/admin/products/deletesimilar", data),

	createProduct: (data: any) => post("/admin/products/create", data),

	createVariant: (data: any) => post("/admin/productsvariant/create", data),

	deleteCategory: (data: any) => post("/admin/products/category", data),
};
