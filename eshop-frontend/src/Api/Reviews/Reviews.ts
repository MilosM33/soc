import { post } from "../Client";
export const ReviewsApi = {
	create: (variantId: number, rating: number, comment: string, user: any) =>
		post(`reviews/create`, { variantId, rating, comment, user }),

	edit: (reviewId: number, rating: number, comment: string, user: any) =>
		post(`reviews/edit`, { reviewId, rating, comment, user }),
};
