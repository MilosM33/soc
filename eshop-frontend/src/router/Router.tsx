import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import About from "../Pages/About";
import Admin from "../Pages/Admin/Admin";
import AdminCategories from "../Pages/Admin/AdminCategories";
import AdminOrders from "../Pages/Admin/AdminOrders";
import AdminUsers from "../Pages/Admin/AdminUsers";
import CategoryPage from "../Pages/CategoryPage";
import Checkout from "../Pages/Checkout/Checkout";
import CheckoutCart from "../Pages/Checkout/CheckoutCart/CheckoutCart";
import CompletePayment from "../Pages/Checkout/CompletePayment/CompletePayment";
import Payment from "../Pages/Checkout/Payment/Payment";
import Review from "../Pages/Checkout/Review/Review";
import ShippingForm from "../Pages/Checkout/ShippingForm/ShippingForm";
import MainPage from "../Pages/Main";
import MyAccount from "../Pages/MyAccount";
import NotFound from "../Pages/NotFound";
import OrderComplete from "../Pages/OrderComplete";
import Orders from "../Pages/Orders";
import Preview from "../Pages/Preview";
import Register from "../Pages/Register";
import TrackOrder from "../Pages/TrackOrder";
import VerifyAccount from "../Pages/VerifyAccount";
import Whislist from "../Pages/Whislist";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/products/:slug",
    element: <Preview />,
  },
  {
    path: "/product/:slug",
    element: <Preview />,
  },
  {
    path: "/category/product/:slug",
    element: <Preview />,
  },
  {
    path: "/category/:category_slug/product/:slug",
    element: <Preview />,
  },
  {
    path: "/category/:category_slug/:subcategory_slug/product/:slug",
    element: <Preview />,
  },

  {
    path: "/checkout",
    element: <Checkout />,

    children: [
      {
        path: "cart",
        element: <CheckoutCart />,
      },
      {
        path: "shipping",
        element: <ShippingForm />,
      },
      {
        path: "choose-payment",
        element: <Payment></Payment>,
      },

      {
        path: "review",
        element: <Review />,
      },
      {
        path: "pay",
        element: <CompletePayment />,
      },
    ],
  },
  {
    path: "/order-complete/:some",
    element: <OrderComplete />,
  },
  {
    path: "/order-complete",
    element: <OrderComplete />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/category",

    element: <CategoryPage />,
    handle: {
      crumb: (data: any) => <Link to="/category">Category</Link>,
    },
    children: [
      {
        path: ":category_slug",
        element: <CategoryPage />,
        children: [
          {
            path: ":subcategory_slug",
            element: <CategoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/wishlist",
    element: <Whislist></Whislist>,
  },
  { path: "/wishlist/product/:slug", element: <Preview /> },
  {
    path: "track-order",
    element: <TrackOrder />,
  },
  {
    path: "track-order/:orderNumber",
    element: <TrackOrder />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "orders/:orderNumber",
    element: <Orders />,
  },
  {
    path: "my-account",
    element: <MyAccount />,
  },
  {
    path: "my-account/verify",
    element: <VerifyAccount />,
  },
  {
    path: "my-account/verify/:token",
    element: <VerifyAccount />,
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "products",
        element: <div>hi</div>,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "categories",
        element: <AdminCategories />,
      },
      {
        path: "products",
        element: <div>hi</div>,
      },
      {
        path: "settings",
        element: <div>hi</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
