import React from "react";
import ErrorPage from "./ErrorPage";
import Link from "../../components/Utils/Link/Link";
export default function PageNotFound() {
  return (
    <ErrorPage
      title="Error 404 - Page not found"
      message="The page you are looking for does not exist"
    >
      <div className="mt-5">
        <Link to={"/"}>Go to home</Link>
      </div>
    </ErrorPage>
  );
}
