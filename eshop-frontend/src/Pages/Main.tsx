import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsTruck, BsSpeedometer } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductSection from "../Components/Product/ProductSection";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Button from "../Components/Forms/Button/Button";
import DailySale from "../Components/DailySale/DailySale";
import { useNavigate } from "react-router";
import Blog from "../Components/Blog/Blog";
import CategoryLink from "../Components/CategoryLink/CategoryLink";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "../Api/Category/Category";
import { setCategories } from "../Reducers/Category/CategoryReducer";
import Skeleton from "../Components/Skeleton/Skeleton";

export default function MainPage() {
	const navigate = useNavigate();

	const categories = useSelector((state: any) => state.categories);
	const dispatch = useDispatch();

	useEffect(() => {
		Category.getCategories().then((res) => {
			dispatch(setCategories(res.data));
		});
	}, []);

	return (
		<section>
			<div className="px-4 py-2 bg-red-400 text-primary text-center text-lg">
				Free shipping for orders over €100
			</div>
			<Header></Header>
			<section className="w-full mx-auto relative">
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					onSwiper={(swiper) => console.log(swiper)}
					className="w-full"
					modules={[Thumbs, Navigation, Pagination, Autoplay]}
					navigation
					pagination={{ clickable: true }}
					autoplay={{ delay: 5000 }}
					loop={true}
					speed={1000}
				>
					<SwiperSlide className="w-full relative">
						<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-start items-center">
							<section className="w-4/5 mx-auto">
								<h1 className="text-white text-4xl my-2">
									Shop for All
									<br /> Your Everyday Essentials
								</h1>
								<p className="text-white my-2">
									Get all your everyday essentials in one <br /> place with
									EverydayEssentials.
								</p>
								<Button
									variant="primary"
									onClick={() => navigate("category/woman-s-clothing")}
								>
									Start shopping
								</Button>
							</section>
						</div>
						<img
							src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
							alt=""
							className="w-full h-[500px] object-cover"
						/>
					</SwiperSlide>
				</Swiper>
			</section>

			<section className="container mx-auto my-10">
				<section className="flex flex-col gap-2 justify-center md:flex-row md:gap-4">
					<div className="bg-red-light p-4 py-6 rounded-md">
						<h3 className="text-xl text-red-dark flex justify-center items-center">
							<BsTruck className="mx-2"></BsTruck> Transport within the Slovak Republic
						</h3>
					</div>
					<div className="bg-green-light p-4 py-6  rounded-md">
						<h3 className="text-xl text-green-dark flex justify-center items-center">
							<FaLeaf className="mx-2"></FaLeaf> Ecological products
						</h3>
					</div>
					<div className="bg-yellow-light p-4 py-6  rounded-md">
						<h3 className="text-xl text-yellow-dark flex justify-center items-center">
							<BsSpeedometer className="mx-2"></BsSpeedometer> Fast shipping
						</h3>
					</div>
				</section>
			</section>

			<section className="container mx-auto columns-1 md:columns-3 gap-2 my-10">
				{categories &&
					categories.categories.map((category: any) => {
						return <CategoryLink {...category}></CategoryLink>;
					})}

				{categories.categories.length === 0 &&
					Array(10)
						.fill(0)
						.map((item, index) => {
							return (
								<div
									style={{ height: "300px", overflow: "hidden" }}
									className="w-full mb-2"
								>
									<Skeleton className="w-full aspect-square"></Skeleton>
								</div>
							);
						})}
			</section>

			{/* <DailySale></DailySale> */}

			<Blog></Blog>
			<Footer></Footer>
		</section>
	);
}
