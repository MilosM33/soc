import Layout from "../Layout/Layout";
import { useParams } from "react-router";
import NavLink from "../Components/Navigation/NavLink/NavLink";
import ProductSection from "../Components/Product/ProductSection";
import TextInput from "../Components/Forms/TextInput/TextInput";
import { useEffect, useState } from "react";
import { Category } from "../Api/Category/Category";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import {
	CategoryState,
	setCategories,
	setSelectedCategory,
	setSubCategories,
	setSubCategoriesState,
} from "../Reducers/Category/CategoryReducer";
import Skeleton from "../Components/Skeleton/Skeleton";
import { Product } from "../Api/Product/Product";
import { IProductListingPage } from "../Components/Product/IProductListing";
import Select from "../Components/Forms/Select/Select";
import Filters from "../Components/Filters/Filters";

import { useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import { toggleCart } from "../Reducers/Cart/CartReducer";
import { setHamburger } from "../Reducers/Hamburger/HamburgerReducer";

export default function CategoryPage() {
	const { category_slug, subcategory_slug } = useParams<{
		category_slug: string;
		subcategory_slug: string;
	}>();
	const location = useLocation();
	const dispatch = useDispatch();
	const categories: CategoryState = useSelector(
		(state: any) => state.categories
	);

	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
	const [filterValues, setFilterValues] = useState<any>({
		category: category_slug,
		subcategory: subcategory_slug,
	});

	const [filters, setFilter] = useState<any>([]);
	const [variantFilters, setvariantFilter] = useState<any>([]);

	const { data, isSuccess, isFetching, isError, isLoading, refetch } = useQuery(
		{
			queryKey: ["products", page, { ...filterValues }],
			queryFn: () => fetchPage(page),
			retry: 0,
		}
	);

	function fetchPage(page: number = 1): Promise<IProductListingPage> {
		return Product.getProductsByPage(page, {
			params: {
				...filterValues,
				category: category_slug,
				subcategory: subcategory_slug,
			},
		}).then((res) => {
			setFilter(res.data.filters);
			setvariantFilter(res.data.variantFilters);
			setTotal(res.data.products.meta.last_page);

			return res.data.products;
		});
	}

	useEffect(() => {
		refetch();
	}, [filterValues]);

	useEffect(() => {
		if (categories.categories.length === 0) {
			Category.getCategories().then((response) => {
				dispatch(setCategories(response.data));
			});
		}
		if (category_slug != null && subcategory_slug == null) {
			console.log(categories.categories);
			const selectedCategory = categories.categories.find(
				(category: any) => category.slug == category_slug
			);

			dispatch(setSelectedCategory(selectedCategory));
		}

		if (category_slug != null) {
			dispatch(setSubCategoriesState("loading"));
			Category.getSubCategoriesByCategory(category_slug).then((response) => {
				dispatch(setSubCategories(response.data));

				if (response.data.length === 0) {
					dispatch(setSubCategoriesState("error"));
				} else {
					dispatch(setSubCategoriesState("success"));
				}

				const selectedCategory = response.data.find(
					(subcategory: any) => subcategory.slug === subcategory_slug
				);

				if (selectedCategory != null) {
					setFilterValues({ ...filterValues, subcategory: subcategory_slug });
					dispatch(setSelectedCategory(selectedCategory));
				}
			});
		}
	}, [location]);

	useEffect(() => {
		setFilterValues({
			category: category_slug,
			subcategory: subcategory_slug,
		});
	}, [category_slug, subcategory_slug]);
	return (
		<Layout>
			<div className="container mx-auto">
				<Breadcrumbs></Breadcrumbs>
				<div className="flex my-4">
					{ReactDOM.createPortal(
						<section className="w-full lg:w-1/4 p-4 rounded">
							<h1 className="text-2xl font-medium my-2">Categories</h1>
							{categories.categories.length == 0 &&
								Array.from(Array(10).keys()).map((key) => (
									<Skeleton className="my-2"></Skeleton>
								))}

							{categories?.categories && (
								<>
									<ul className="">
										{categories.categories?.map((category: any) => (
											<li
												onClick={() => {
													dispatch(setSelectedCategory(category));
													dispatch(setHamburger(false));
												}}
											>
												<NavLink to={`/category/${category.slug}`}>
													{category.name}
												</NavLink>
											</li>
										))}
									</ul>
								</>
							)}

							<Filters
								filters={{
									filters,
									variantFilters,
								}}
								OnSubmit={(values: any) => {
									setFilterValues(values);
								}}
								OnReset={() => {
									setFilterValues({
										category: category_slug,
										subcategory: subcategory_slug,
									});
								}}
							></Filters>
						</section>,
						document.getElementById("sidebar") ?? document.createElement("div")
					)}

					<section className="flex-1 px-4">
						<h1 className="text-2xl">
							{categories.selectedCategory?.name ?? <Skeleton />}
						</h1>
						<p className="text-gray-500 my-2">
							{categories.selectedCategory?.description ?? <Skeleton />}
						</p>

						<ul className="list-none flex gap-2">
							{categories.subCategoriesState === "loading" &&
								Array.from(Array(10).keys()).map((key) => (
									<Skeleton className="w-full aspect-square"></Skeleton>
								))}

							{categories.subCategoriesState === "success" &&
								categories.subCategories?.map((category: any) => (
									<li
										className="p-2 border-2 rounded border-gray-300"
										onClick={() => dispatch(setSelectedCategory(category))}
									>
										<Link to={`/category/${category_slug}/${category.slug}`}>
											{category.name}
										</Link>
									</li>
								))}
						</ul>

						<ProductSection
							isLoading={isFetching}
							isSuccess={isSuccess}
							isError={isError}
							products={data?.data ?? []}
							setPage={setPage}
							page={page}
							total={total}
						></ProductSection>
					</section>
				</div>
			</div>
		</Layout>
	);
}
