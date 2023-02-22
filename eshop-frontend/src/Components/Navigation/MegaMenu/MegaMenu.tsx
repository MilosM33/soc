import React, { useEffect } from "react";
import NavLink from "../NavLink/NavLink";
import { useState } from "react";
import { Category } from "../../../Api/Category/Category";
export default function MegaMenu(props: any) {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    Category.getNavibarCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <section className="absolute top-full left-0 w-full bg-white shadow-lg max-h-0 group-hover:max-h-[500px] delay-200 transition-all duration-500 overflow-hidden">
      <hr />
      <div className="container py-8 mx-auto flex relative max-h-[50%]">
        {/* {categories != null &&
          categories.map((category: any) => {
            <section className="px-8 w-64 relative transition-all duration-300 delay-[200ms] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100  ">
              <h1 className="text-xl my-2">
                <NavLink to={category[0].category_slug}>
                  {category[0].category_name}
                </NavLink>
              </h1>
              
            </section>;
          })} */}

        {Object.keys(categories).map((key, _) => {
          return (
            <section
              className={`px-8 w-64 relative transition-all duration-300  translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 `}
              style={{
                transitionDelay: `${_ * 100 + 200}ms`,
              }}
            >
              <h1 className="text-xl my-2">
                <NavLink to={"/category/" + categories[key][0].category_slug}>
                  {categories[key][0].category_name}
                </NavLink>
              </h1>
              <ul>
                {categories[key].map((subCategory: any) => (
                  <NavLink
                    to={
                      "/category/" +
                      subCategory.category_slug +
                      "/" +
                      subCategory.subcategory_slug
                    }
                  >
                    {subCategory.subcategory_name}
                  </NavLink>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
