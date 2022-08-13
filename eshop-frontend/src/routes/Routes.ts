import MainPage from "./MainPage";
import ProductPreview from "./ProductPreview";

const routes = [
  {
    path: "/",
    element: MainPage,
    exact: true,
  },
  {
    path: "/cart",
    element: MainPage,
    exact: true,
  },
  {
    path: "/product/:id",
    element: ProductPreview,
    exact: true,
  },
  {
    path: "/account",
    element: MainPage,
    exact: true,
  },
];
export default routes;
