import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenresDropdown from "../components/GenresDropdown";
export default function Layout() {
  return (
    <div className="style-layout-system">
      <nav className="style-header">Header</nav>
      <GenresDropdown />
      <div className="style-main-content">
        {/* slot da riempire con la rotta annidata */}
        <Outlet />
      </div>

      <footer className="style-footer">Footer</footer>
    </div>
  );
}
