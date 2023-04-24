import {
	AiOutlineDatabase,
	AiOutlineHome,
	AiOutlineShoppingCart,
	AiOutlineTag,
	AiOutlineUser,
} from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import NavLink from "../../Components/Navigation/NavLink/NavLink";
import Header from "../../Layout/Header";

import { Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
export default function Admin() {
	const user = useSelector((state: any) => state.user);
	const [ele, setEle] = useState<any>();

	useEffect(() => {
		setEle(document.getElementById("sidebar"));
	}, [document.getElementById("sidebar")]);

	if (!user.isAuth || user.role === "user") {
		return <Navigate to={"/"} />;
	}

	const adminCategories = [
		{ id: 1, icon: <AiOutlineHome />, name: "Home", to: "/admin/home" },
		{ id: 2, icon: <AiOutlineUser />, name: "Users", to: "/admin/users" },
		{
			icon: <BiPackage />,
			name: "Orders",
			to: "/admin/orders",
		},
		{
			id: 3,
			icon: <AiOutlineShoppingCart />,
			name: "Products",
			to: "/admin/products",
		},
		{
			id: 4,
			icon: <AiOutlineDatabase />,
			name: "Categories",
			to: "/admin/categories",
		},
		{
			id: 5,
			icon: <AiOutlineTag />,
			name: "Attributes",
			to: "/admin/attributes",
		},
		{
			id: 6,
			icon: <IoFilterSharp />,
			name: "Filters",
			to: "/admin/filters",
		},
		{
			id: 7,
			icon: <AiOutlineTag />,
			name: "Blog",
			to: "/admin/blog",
		},
	];

	const warehouseworkerCategories = [
		{ id: 1, icon: <AiOutlineHome />, name: "Home", to: "/admin" },
		{
			icon: <BiPackage />,
			name: "Orders",
			to: "/admin/orders",
		},
	];
	return (
		<section style={{ minHeight: "100vh" }}>
			<Header></Header>
			<div className="h-full hidden md:flex">
				<div className="w-48">
					<ul className="p-4 space-y-4">
						{user.role == "admin" &&
							adminCategories.map((category) => (
								<NavLink to={category.to}>
									<li key={category.id} className="text-xl space-x-4">
										<span className="inline-block">{category.icon}</span>
										<span>{category.name}</span>
									</li>
								</NavLink>
							))}

						{user.role == "warehouseworker" &&
							warehouseworkerCategories.map((category) => (
								<NavLink to={category.to}>
									<li key={category.id} className="text-xl space-x-4">
										<span className="inline-block">{category.icon}</span>
										<span>{category.name}</span>
									</li>
								</NavLink>
							))}
					</ul>
				</div>

				<div className="flex-1 p-4">
					<h1 className="text-3xl ">Dashboard</h1>
					<div className="my-3">
						<Breadcrumbs></Breadcrumbs>
					</div>

					<Outlet></Outlet>
				</div>
			</div>
			<div className="flex h-full md:hidden">
				{ele &&
					ReactDOM.createPortal(
						<div className="w-48">
							<ul className="p-4 space-y-4">
								{user.role == "admin" &&
									adminCategories.map((category) => (
										<NavLink to={category.to}>
											<li key={category.id} className="text-xl space-x-4">
												<span className="inline-block">{category.icon}</span>
												<span>{category.name}</span>
											</li>
										</NavLink>
									))}

								{user.role == "warehouseworker" &&
									warehouseworkerCategories.map((category) => (
										<NavLink to={category.to}>
											<li key={category.id} className="text-xl space-x-4">
												<span className="inline-block">{category.icon}</span>
												<span>{category.name}</span>
											</li>
										</NavLink>
									))}
							</ul>
						</div>,
						ele
					)}

				<div className="flex-1 p-4">
					<h1 className="text-3xl ">Dashboard</h1>
					<div className="my-3">
						<Breadcrumbs></Breadcrumbs>
					</div>

					<Outlet></Outlet>
				</div>
			</div>
		</section>
	);
}
