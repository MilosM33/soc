import React from "react";
import Backdrop from "../Utils/Backdrop/Backdrop";
import LoginForm from "./Forms/LoginForm";

export default function Auth(props: any) {
  return (
    <>
      <LoginForm onClose={props.onClose} />
      <Backdrop isOpen={true}></Backdrop>
    </>
  );
}
