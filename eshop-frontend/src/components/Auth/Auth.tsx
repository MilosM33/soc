import React from "react";
import LoginForm from "./Forms/LoginForm";

export default function Auth(props: any) {
  return <LoginForm onClose={props.onClose} />;
}
