import {
  AiOutlineDatabase,
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import NavLink from "../../Components/Navigation/NavLink/NavLink";
import Header from "../../Layout/Header";

import { Navigate } from "react-router-dom";
export default function Admin() {
  const user = useSelector((state: any) => state.user);
  
  if (!user.isAuth || user.role === "user") {
    return <Navigate to={"/"} />;
  }

  const categories = [
    { id: 1, icon: <AiOutlineHome />, name: "Home", to: "/admin" },
    { id: 2, icon: <AiOutlineUser />, name: "Users", to: "/admin/users" },
    {
      icon: <BiPackage />,
      name: "Orders",
      to: "/admin/orders",
    },
    {
      id: 3,
      icon: <AiOutlineShoppingCart />,
      name: "Products",
      to: "/admin/products",
    },
    {
      id: 4,
      icon: <AiOutlineDatabase />,
      name: "Categories",
      to: "/admin/categories",
    },

  ];

  return (
    <section>
      <Header></Header>
      <div className="flex max-h-screen h-screen">
        <div className="w-48">
          <ul className="p-4 space-y-4">
            {categories.map((category) => (
              <NavLink to={category.to}>
                <li key={category.id} className="text-xl space-x-4">
                  <span className="inline-block">{category.icon}</span>
                  <span>{category.name}</span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-3xl ">Dashboard</h1>
          <div className="my-3">
            <Breadcrumbs></Breadcrumbs>
          </div>

          <Outlet></Outlet>
        </div>
      </div>
    </section>
  );
}
