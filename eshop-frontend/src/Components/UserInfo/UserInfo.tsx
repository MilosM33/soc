import React from "react";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import IconButton from "../Forms/IconButton/IconButton";
import LoginForm from "../LoginForm/LoginForm";
import PopUnder from "../PopUnder/PopUnder";
import NavLink from "../Navigation/NavLink/NavLink";
import {
	AiOutlineShoppingCart,
	AiOutlineUser,
	AiOutlineBell,
	AiOutlineClockCircle,
	AiOutlineDashboard,
} from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";

import { useSelector } from "react-redux";
import { IUserState } from "../../Reducers/User/UserReducer";

import { User } from "../../Api/User/User";
import Button from "../Forms/Button/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Reducers/User/UserReducer";
import { useLocation, useNavigate } from "react-router";

export default function UserInfo() {
	const [isOpen, setIsOpen] = useState(false);
	const user: IUserState = useSelector((state: any) => state.user);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		User.me()
			.then((res) => {
				if (res.data) {
					dispatch(setUserData({ ...res.data, isAuth: true }));

					const verified = res.data.user.email_verified_at;
					if (
						(verified === undefined || verified === null) &&
						location.pathname.indexOf("verify") === -1
					) {
						return navigate("/my-account/verify");
					}
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					dispatch(setUserData({ isAuth: false }));
				}
			});
	}, []);

	return (
		<section className="relative">
			<IconButton
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<AiOutlineUser></AiOutlineUser>
			</IconButton>
			<PopUnder
				className="top-10 left-1/2 -translate-x-1/2"
				IsOpen={isOpen}
				SetIsOpen={setIsOpen}
			>
				{user.isAuth ? <UserNavigation /> : <LoginForm />}
			</PopUnder>
		</section>
	);
}

function UserNavigation() {
	const user: IUserState = useSelector((state: any) => state.user);
	return (
		<section className="flex flex-col text-lg w-56">
			<NavLink to="/my-account" className="">
				<AiOutlineUser className="inline mx-2" />
				My Account
			</NavLink>
			<NavLink to="/orders" className="">
				<AiOutlineShoppingCart className="inline mx-2" />
				My Orders
			</NavLink>

			<NavLink to="/track-order" className="">
				<AiOutlineClockCircle className="inline mx-2" />
				Track orders
			</NavLink>
			{user.role !== "user" && (
				<NavLink to="/admin/home" className="">
					<AiOutlineDashboard className="inline mx-2" />
					Admin
				</NavLink>
			)}
			<Button variant="secondary" onClick={() => User.logout()}>
				<GiExitDoor className="inline mx-2" />
				Logout
			</Button>
		</section>
	);
}
