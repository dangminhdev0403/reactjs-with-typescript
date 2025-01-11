import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, notification } from "antd";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./App.scss";
import UserPage from "./screens/user.page";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to="/"> Home </Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users"> Manager User </Link>,
    key: "users",
    icon: <UserOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
  //  console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const LayoutAdmin = () => {

   const getData = async () => {
     const res = await fetch("http://localhost:8080/api/v1/auth/login", {
       method: "POST",
       //fetch with beartoken
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         username: "admin@gmail.com",
         password: "123456",
       }),
     });

     const d = await res.json();
     if (d.data) {
           localStorage.setItem("access_token", d.data.access_token);
      
      
     }

    
   };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",

    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
