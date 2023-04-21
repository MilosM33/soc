import { get, post } from "../Client";

export const BlogApi = {

	getBlog: (data: any) => get("/blog", { params: data }),

	getBlogPosts: (data: any) => get("/blog/posts", { params: data }),

	createBlogPost: (data: any) => get("/blog/posts", { params: data }),

	searchBlogPosts: (data: any) => get("/admin/blog/search", { params: data }),

	createBlog: (data: any) => post("/admin/blog/create", data),
	removeBlog: (data: any) => post("/admin/blog/remove", data),
	updateBlog: (data: any) => post("/admin/blog/update", data),



};
