export default interface IProductReview {
  id: number;
  user: {
    name: string;
    is_author: boolean;
  };
  rating: number;
  comment: string;
  created_at: string;
}
