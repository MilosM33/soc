import ReactDOM from "react-dom";
import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillTwitterCircle,
	AiOutlineBell,
	AiOutlineClose,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import IconButton from "../IconButton/IconButton";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";

import UserInfo from "../../UserInfo/UserInfo";

import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../../Reducers/Cart/CartReducer";
import { setHamburger } from "../../../Reducers/Hamburger/HamburgerReducer";
export default function HamburgerMenu() {
	const navigate = useNavigate();

	const IsOpen = useSelector((state: any) => state.hamburger.isOpen);
	const dispatch = useDispatch();

	const element = document.getElementById("portal");
	useLayoutEffect(() => {
		document.body.style.position = IsOpen ? "fixed" : "static";
	}, [IsOpen]);

	if (element == null) return null;
	// useLayoutEffect(() to set body overflow to hidden

	return ReactDOM.createPortal(
		<section
			className={
				"absolute top-0 left-0 w-screen h-screen bg-white z-30 transition-all duration-300 " +
				(IsOpen ? "" : "-translate-x-full")
			}
		>
			<div className="flex w-full h-full">
				<div className="py-4 w-16 h-full flex flex-col items-center bg-gray-300 text-gray-500">
					<IconButton
						onClick={() => {
							dispatch(setHamburger(false));
						}}
					>
						<AiOutlineClose />
					</IconButton>
					<div className="my-4 space-y-2">
						<IconButton
							onClick={() => {
								navigate("/wishlist");

								dispatch(setHamburger(false));
							}}
						>
							<AiOutlineHeart></AiOutlineHeart>
						</IconButton>

						<IconButton
							onClick={() => {
								dispatch(toggleCart());
								dispatch(setHamburger(false));
							}}
						>
							<AiOutlineShoppingCart></AiOutlineShoppingCart>
						</IconButton>
					</div>
				</div>

				<div className="p-10 flex-1 h-full flex flex-col">
					<div id="sidebar"></div>

					<div className="mt-auto flex gap-2 text-xl">
						<a href="https://www.facebook.com" target="_blank">
							<AiFillFacebook></AiFillFacebook>
						</a>
						<a href="https://www.instagram.com/" target="_blank">
							<AiFillInstagram></AiFillInstagram>
						</a>
						<a href="https://www.twitter.com" target="_blank">
							<AiFillTwitterCircle></AiFillTwitterCircle>
						</a>
					</div>
				</div>
			</div>
		</section>,
		element
	);
}
