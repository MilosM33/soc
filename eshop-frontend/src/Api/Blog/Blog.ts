import { get } from "../Client";

export const BlogApi = {
  getBlogPosts: (data: any) => get("/blog/posts", { params: data }),
};
