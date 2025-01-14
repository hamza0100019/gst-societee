import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Layout from "../layouts/layout";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
        {
            path: "/",
            element: <Home/>
          },
          {
            path: "/register",
            element: <Register/>
          },
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/users",
            element: <Users/>
          },
          {
            path: "*",
            element: "Not Found"
          },]
    },
  ]);
