import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaBoxes,
  FaUserFriends,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
  FaChevronDown,
  FaPlusCircle,
  FaEye,
  FaEdit,
} from "react-icons/fa";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="flex flex-col w-56 h-screen bg-blue-900 text-white shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-4 border-b border-blue-700">
        <h1 className="text-xl font-bold">Stock Manager</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col mt-4 px-2">
        {/* Dashboard */}
        <motion.div
          className="flex items-center space-x-3 hover:bg-blue-700 py-3 px-4 rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <FaHome className="text-lg" />
         <a href="/"> <span>Dashboard</span></a>
        </motion.div>

        {/* Stocks Menu */}
        <div className="flex flex-col">
          <motion.div
            className="flex items-center justify-between hover:bg-blue-700 py-3 px-4 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleDropdown("stocks")}
          >
            <div className="flex items-center space-x-3">
              <FaBoxes className="text-lg" />
              <span>Stocks</span>
            </div>
            <FaChevronDown
              className={`transition-transform ${
                openDropdown === "stocks" ? "rotate-180" : ""
              }`}
            />
          </motion.div>
          {openDropdown === "stocks" && (
            <motion.div
              className="flex flex-col mt-2 ml-6 space-y-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 hover:text-blue-300 cursor-pointer">
                <FaPlusCircle className="text-sm" />
                <span>Add Stock</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-blue-300 cursor-pointer">
                <FaEye className="text-sm" />
                <span>View Stocks</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-blue-300 cursor-pointer">
                <FaEdit className="text-sm" />
                <span>Edit Stocks</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Clients Menu */}
        <div className="flex flex-col">
          <motion.div
            className="flex items-center justify-between hover:bg-blue-700 py-3 px-4 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleDropdown("clients")}
          >
            <div className="flex items-center space-x-3">
              <FaUserFriends className="text-lg" />
              <span>Clients</span>
            </div>
            <FaChevronDown
              className={`transition-transform ${
                openDropdown === "clients" ? "rotate-180" : ""
              }`}
            />
          </motion.div>
          {openDropdown === "clients" && (
            <motion.div
              className="flex flex-col mt-2 ml-6 space-y-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 hover:text-blue-300 cursor-pointer">
                <FaPlusCircle className="text-sm" />
                <span>Add Client</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-blue-300 cursor-pointer">
                <FaEye className="text-sm" />
                <span>View Clients</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Employees Menu */}
        <div className="flex flex-col">
          <motion.div
            className="flex items-center justify-between hover:bg-blue-700 py-3 px-4 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleDropdown("employees")}
          >
            <div className="flex items-center space-x-3">
              <FaUsers className="text-lg" />
              <span>Employees</span>
            </div>
            <FaChevronDown
              className={`transition-transform ${
                openDropdown === "employees" ? "rotate-180" : ""
              }`}
            />
          </motion.div>
          {openDropdown === "employees" && (
            <motion.div
              className="flex flex-col mt-2 ml-6 space-y-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 hover:text-blue-300 cursor-pointer">
                <FaPlusCircle className="text-sm" />
                <span>Add Employee</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-blue-300 cursor-pointer">
                <FaEye className="text-sm" />
                <span>View Employees</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Reports */}
        <motion.div
          className="flex items-center space-x-3 hover:bg-blue-700 py-3 px-4 rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <FaChartBar className="text-lg" />
          <span>Reports</span>
        </motion.div>
      </nav>

      {/* Logout */}
      <motion.div
        className="flex items-center space-x-3 mt-auto bg-blue-800 py-3 px-4 mx-4 rounded-lg cursor-pointer hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </motion.div>
    </div>
  );
};

export default Navbar;
