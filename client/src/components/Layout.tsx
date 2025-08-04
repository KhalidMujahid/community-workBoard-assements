import React from "react";
import { Link, Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          <Link to="/dashboard">Community WorkBoard</Link>
        </h1>
        <UserMenu />
      </header>
      <main>{children || <Outlet />}</main>
    </div>
  );
};

export default Layout;
