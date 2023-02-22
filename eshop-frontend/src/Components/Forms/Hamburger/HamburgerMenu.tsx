import ReactDOM from "react-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiOutlineClose,
  AiOutlineFacebook,
  AiOutlineHeart,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineUser,
} from "react-icons/ai";
import IconButton from "../IconButton/IconButton";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function HamburgerMenu({
  IsOpen,
  SetIsOpen,
}: {
  IsOpen: boolean;
  SetIsOpen: any;
}) {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

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
              SetIsOpen(false);
            }}
          >
            <AiOutlineClose />
          </IconButton>
          <div className="my-4 space-y-2">
            <IconButton
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              <AiOutlineHeart />
            </IconButton>
            <IconButton
              onClick={() => {
                if (user.isAuth) {
                  navigate("/my-account");
                } else {
                  toast.error("Please login to view your account");
                  SetIsOpen(false);
                }
              }}
            >
              <AiOutlineUser />
            </IconButton>
          </div>
        </div>

        <div className="p-10 flex-1 h-full bg-gray-200 flex flex-col">
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
