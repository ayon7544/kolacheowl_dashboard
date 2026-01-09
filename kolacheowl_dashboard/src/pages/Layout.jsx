import React from "react";
import Sidebar from "./Sidebar"; // Import Sidebar

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div> {/* Render page content here */}
    </div>
  );
};

export default Layout;
