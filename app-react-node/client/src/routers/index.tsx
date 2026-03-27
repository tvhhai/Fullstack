import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import PublicOnlyPage from "../pages/PublicOnlyPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Users from "../pages/Users";
import CounterPage from "../features/counter/CounterPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/counter", element: <CounterPage /> },
          { path: "/user", element: <Users /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <PublicOnlyPage />,
    children: [{ path: "", element: <Login /> }],
  },
]);
