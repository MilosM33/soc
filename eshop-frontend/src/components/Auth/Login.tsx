import React from "react";
import { useState } from "react";
import Auth from "./Auth";
export default function Login() {
  const [showLogin, setShowLogin] = useState(false);
  function toggleLogin() {
    setShowLogin(!showLogin);
  }
  return (
    <>
      <button onClick={toggleLogin}>Login in</button>
      {showLogin && <Auth onClose={toggleLogin}></Auth>}
    </>
  );
}
