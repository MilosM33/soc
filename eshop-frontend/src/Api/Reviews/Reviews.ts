import { post } from "../Client";
export const ReviewsApi = {
  create: (variantId: number, rating: number, comment: string) =>
    post(`reviews/create`, { variantId, rating, comment }),

  edit: (reviewId: number, rating: number, comment: string) =>
    post(`reviews/edit`, { reviewId, rating, comment }),
};
