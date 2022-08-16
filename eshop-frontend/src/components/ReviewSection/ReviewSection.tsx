import React, { useEffect, useState } from "react";
import { Review } from "../../services/Api/Review";
import ReviewComponent, { IReviewProps } from "../Review/ReviewComponent";
export default function ReviewSection(props: any) {
  const [reviews, setReviews] = useState<IReviewProps[]>([]);
  useEffect(() => {
    Review.getAll(props.slug).then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl my-8">
        Reviews for this product ( {reviews.length} ){" "}
      </h2>
      <button> Add review</button>
      <div
        className="flex flex-col gap-9 md:w-3/4 lg:w-1/2
         mx-auto"
      >
        {reviews.map((review, index) => (
          <ReviewComponent key={index} {...review}></ReviewComponent>
        ))}
        {reviews.length === 0 && (
          <div className="text-center">
            <h3 className="text-2xl">No reviews yet</h3>
            <h2 className="text-xl">Be first who reviews this product!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
