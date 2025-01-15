import React from "react";
import imag from "C:\\xampp\\htdocs\\gst-societee\\vite-project\\src\\assets\\im.png";
const Topbar = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
        />
        <img
          src={imag}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;
