import React from "react";
import Link from "../Utils/Link/Link";
export default function FooterItem(props: any) {
  return (
    <section className="flex-1">
      <h1 className="text-2xl my-4 font-medium">{props.title}</h1>
      {props.subroutes && (
        <ul className="list-none space-y-4">
          {props.subroutes.map((subroute: any) => {
            return (
              <li key={subroute.route}>
                <Link to={subroute.route} theme="dark">
                  {subroute.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {props.children}
    </section>
  );
}
