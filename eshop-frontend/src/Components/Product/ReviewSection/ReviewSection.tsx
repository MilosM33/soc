import Button from "../../Forms/Button/Button";
import Select from "../../Forms/Select/Select";
import ReviewStars from "../../ReviewStars/ReviewStars";
import IProductReview from "../IProductReview";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineEdit } from "react-icons/ai";
import IconButton from "../../Forms/IconButton/IconButton";
import { ReviewsApi } from "../../../Api/Reviews/Reviews";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

export default function ReviewSection({
	reviews,
	variantId,
	setReviews,
}: {
	reviews: IProductReview[];
	variantId: number;
	setReviews: (reviews: IProductReview[]) => void;
}) {
	const [sort, setSort] = useState("by rating asc");
	const [isOpened, setIsOpened] = useState(false);
	const [review, setReview] = useState<any>({
		rating: 0,
		content: "",
		is_author: true,
		user: {
			is_anonymous: false,
		},
	});
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(0);

	const user = useSelector((state: any) => state.user);

	function filter() {
		if (sort === "by rating asc") {
			reviews = reviews.sort((a, b) => a.rating - b.rating);
		} else if (sort === "by rating desc") {
			reviews = reviews.sort((a, b) => b.rating - a.rating);
		} else if (sort === "recent") {
			reviews = reviews.sort(
				(a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
			);
		} else if (sort === "older") {
			reviews = reviews.sort(
				(a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
			);
		}

		return reviews;
	}

	function editReview() {
		ReviewsApi.edit(editId, review.rating, review.content, review.user)
			.then((res) => {
				toast.success("Review created");
				setReview({
					rating: 0,
					content: "",
					is_author: true,
				});
				setIsOpened(false);
				const newReviews = reviews.map((review) => {
					if (review.id === editId) {
						return res.data.review;
					}
					return review;
				});

				setReviews(newReviews);
			})
			.catch((err) => {
				if (err.response.data.message === "The rating must be at least 1.") {
					toast.error("You need to rate at least 1 star");
				} else {
					toast.error("Error while creating review, Please try again later");
				}
			});
	}
	function createReview() {
		ReviewsApi.create(variantId, review.rating, review.content, review.user)
			.then((res) => {
				toast.success("Review created");
				setReview({
					rating: 0,
					content: "",
					is_author: true,
				});
				setIsOpened(false);

				setReviews([...reviews, res.data.review]);
			})
			.catch((err) => {
				if (err.response.data.message === "The rating must be at least 1.") {
					toast.error("You need to rate at least 1 star");
				} else if (
					err.response.data.message === "You have already reviewed this product"
				) {
					toast.error("You have already reviewed this product.");
				} else {
					toast.error("Error while creating review, Please try again later");
				}
			});
	}

	return (
		<section className="mb-8">
			<h1 className="text-2xl text-primary uppercase">Reviews</h1>
			<div className="w full md:w-1/2 flex items-center gap-2">
				<div className="w-64">
					<Select
						options={["by rating asc", "by rating desc", "recent", "older"]}
						onChange={(e: any) => setSort(e.target.value)}
						selected={sort}
					></Select>
				</div>
				<Button
					onClick={() => {
						if (!user.isAuth) {
							toast.error("You need to be logged in to write a review");
							return;
						}

						setIsOpened(!isOpened);
						setReview({
							...review,
						});
						setIsEditing(false);
					}}
					variant={isOpened ? "secondary" : "primary"}
				>
					{isOpened ? "Close" : "Write a review"}
				</Button>
			</div>
			{isEditing}
			<div
				className={
					"transition-all duration-500 overflow-hidden " +
					(isOpened ? "max-h-[900px]" : "max-h-0")
				}
			>
				<h1 className="text-xl">Hodnotenie</h1>

				<ReviewStars
					rating={review.rating}
					canRate={true}
					onRate={(rating) =>
						setReview({
							...review,
							rating: rating,
						})
					}
					key={review.rating}
				></ReviewStars>

				<ReactQuill
					theme="snow"
					value={review.content}
					onChange={(value: any) => {
						setReview({
							...review,
							content: value,
						});
					}}
					style={{ height: "200px" }}
				/>
				<div className="mt-20 md:mt-16">
					<label htmlFor="">Don't show my name</label>

					<input
						type="checkbox"
						name=""
						id=""
						value={review?.user?.is_anonymous ?? false}
						onChange={(e) => {
							setReview({
								...review,
								user: {
									...review.user,
									is_anonymous: e.target.checked,
								},
							});
						}}
					/>
				</div>

				{!isEditing ? (
					<Button onClick={() => createReview()}>Submit</Button>
				) : (
					<Button onClick={() => editReview()}>Update</Button>
				)}
			</div>

			<section
				className="w-full my-5 md:w-1/2 mx-auto space-y-4"
				id="blogPreview"
			>
				{reviews.length === 0 && (
					<h3 className="text-center text-xl">No reviews yet</h3>
				)}
				{filter().map((review: IProductReview, _: number) => {
					return (
						<article className="flex justify-between items-start">
							<div className="flex items-start gap-4">
								<img
									src="https://via.placeholder.com/128"
									className="w-12 h-12 rounded-full"
									alt=""
								/>
								<div>
									<h3 className="text-primary text-lg">
										{review.user != null && review.user.name}
										{review.user != null &&
											review.user.name == "Anonym" &&
											"(Moja recenzia)"}
										{review.user.is_author && (
											<IconButton
												onClick={() => {
													setReview({
														content: review.comment,
														rating: review.rating,
														is_author: true,
													});
													setIsEditing(true);
													setEditId(review.id);
													setIsOpened(true);
												}}
												className="inline-block"
											>
												<AiOutlineEdit></AiOutlineEdit>
											</IconButton>
										)}
									</h3>
									<small className="text-gray-400">
										{new Date(review.created_at).toLocaleString("sk-SK")}
									</small>
									<p className="leading-8 text-gray-400">
										{parse(review.comment)}
									</p>
								</div>
							</div>
							<ReviewStars
								rating={review.rating}
								canRate={false}
								key={Math.random() % 999999}
							></ReviewStars>
						</article>
					);
				})}
			</section>
		</section>
	);
}
