import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="w-4/5 p-6">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
