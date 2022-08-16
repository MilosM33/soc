import React, { useEffect, useState } from "react";
import { Review } from "../../services/Api/Review";
import ReviewComponent, { IReviewProps } from "../Review/ReviewComponent";
import Skeleton from "../Skeleton/Skeleton";
export default function ReviewSection(props: any) {
  const [reviews, setReviews] = useState<IReviewProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Review.getAll(props.slug).then((res) => {
      setReviews(res.data);
      setLoading(false);
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
        {loading
          ? Array(10)
              .fill(0)
              .map((_) => (
                <section>
                  <Skeleton type="text"></Skeleton>
                  <Skeleton type="text"></Skeleton>
                  <Skeleton type="title"></Skeleton>
                </section>
              ))
          : reviews.map((review, index) => (
              <ReviewComponent key={index} {...review}></ReviewComponent>
            ))}
      </div>
    </div>
  );
}
