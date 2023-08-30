import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { assertRouteKey } from "../Assets/Constants/Routes";

const Welcome = React.lazy(() => import("../Pages/Welcome/Welcome"));
const Contacts = React.lazy(() => import("../Pages/Contacts/Contacts"));
const Products = React.lazy(() => import("../Pages/Products/Products"));
const FollowPurchase = React.lazy(
  () => import("../Pages/FollowPurchase/FollowPurchase")
);
const FinishedPurchase = React.lazy(
  () => import("../Pages/FinishedPurchase/FinishedPurchase")
);
const Basket = React.lazy(() => import("../Pages/Basket/Basket"));
const UI = React.lazy(() => import("../Pages/UI/UI"));

export const router = createBrowserRouter([
  {
    path: assertRouteKey("/"),
    element: <Welcome />,
  },
  {
    path: assertRouteKey("/"),
    element: <Layout />,
    children: [
      {
        path: assertRouteKey("contacts"),
        element: <Contacts />,
      },
      {
        path: assertRouteKey("products"),
        element: <Products />,
      },
      {
        path: assertRouteKey("followPurchase"),
        element: <FollowPurchase />,
      },
      {
        path: assertRouteKey("finishedPurchase"),
        element: <FinishedPurchase />,
      },
      {
        path: assertRouteKey("basket"),
        element: <Basket />,
      },
      {
        path: "/ui",
        element: <UI />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
