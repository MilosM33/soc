import MainPage from "./MainPage";

const routes = [
  {
    path: "/",
    component: MainPage,
    exact: true,
  },
  {
    path: "/cart",
    component: MainPage,
    exact: true,
  },
  {
    path: "/preview/:id",
    component: MainPage,
    exact: true,
  },
  {
    path: "/account",
    component: MainPage,
    exact: true,
  },
];
