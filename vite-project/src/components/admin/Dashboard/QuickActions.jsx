import React from "react";
import { FaPlus, FaFileAlt, FaUserPlus } from "react-icons/fa";

const QuickActions = () => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="flex space-x-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
          <FaPlus /> Add Product
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
          <FaUserPlus /> Add Client
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition">
          <FaFileAlt /> Generate Report
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
