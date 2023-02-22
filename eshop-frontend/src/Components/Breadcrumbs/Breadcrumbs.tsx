import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import { Link } from "react-router-dom";

export default function Breadcrumbs() {
  const ignore = ["/product"];

  const ProductItemRoute = ({ match }: { match: any }) => {
    return null;
  };

  const breadcrumbs = useBreadcrumbs();
  return (
    <>
      {breadcrumbs.map(
        ({ match, breadcrumb }: { match: any; breadcrumb: any }) => (
          <Link key={match.pathname} to={match.pathname}>
            {!ignore.includes(breadcrumb.key) && <span>{breadcrumb} / </span>}
          </Link>
        )
      )}
    </>
  );
}
