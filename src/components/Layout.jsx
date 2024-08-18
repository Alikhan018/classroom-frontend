import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./fixed/Navbar";

export default function Layout() {
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
}
