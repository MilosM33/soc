import React from "react";
import AuthCheck from "../../Auth/AuthCheck";
import ReviewComponent from "./Review/ReviewComponent";
import Skeleton from "../../Utils/Skeleton/Skeleton";
export default function ReviewSection(props: any) {
  return (
    <div>
      <h2 className="text-2xl my-8">
        Reviews for this product ( {props.reviews.length} ){" "}
      </h2>
      <span>
      <input type="checkbox" name="" id="" />
      Review only for this variant
      </span>
      <AuthCheck>
        <button> Add review</button>
      </AuthCheck>
      <div
        className="flex flex-col gap-9 md:w-3/4 lg:w-1/2
         mx-auto"
      >
        {props.loading
          ? Array(10)
              .fill(0)
              .map((_) => (
                <section>
                  <Skeleton type="text"></Skeleton>
                  <Skeleton type="text"></Skeleton>
                  <Skeleton type="title"></Skeleton>
                </section>
              ))
          : props.reviews.map((review: any, index: number) => (
              <ReviewComponent key={index} {...review}></ReviewComponent>
            ))}
        {!props.loading && props.reviews.length === 0 && (
          <div className="text-center">
            <h3 className="text-2xl">No reviews yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}
