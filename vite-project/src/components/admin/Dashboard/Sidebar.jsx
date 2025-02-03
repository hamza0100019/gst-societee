import React, { useState } from "react";
import imag from "C:\\wamp\\www\\laravel\\gst-societee\\vite-project\\src\\assets\\logo.png";
import {
  FaUserFriends,
  FaBoxes,
  FaUserTie,
  FaTools,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";
import { MdDashboard, MdExpandMore, MdExpandLess, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../api/axios";

const Sidebar = () => {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosClient.post("/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    } finally {
      localStorage.removeItem("auth_token");
      navigate("/login");
    }
  };

  const Button = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-3 text-base font-semibold text-[#112D4E] bg-[#F9F7F7] hover:bg-[#3F72AF] hover:text-white rounded-lg shadow-md w-full transition-transform transform hover:scale-105"
    >
      <Icon size={24} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF] text-[#112D4E] flex flex-col shadow-lg fixed">
      {/* Branding */}
      <div className="px-6 py-8 flex justify-center items-center bg-gradient-to-r from-[#3F72AF] to-[#112D4E] shadow-lg">
        <img
          src={imag}
          alt="Logo"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#F9F7F7] shadow-lg"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <Button icon={MdDashboard} label="Dashboard" onClick={() => navigate("/dashboard")} />
        <Button icon={FaBoxes} label="Stock Management" onClick={() => navigate("/dashboard/stock")} />
        <Button
          icon={FaUserFriends}
          label="Client Management"
          onClick={() => navigate("/dashboard/clients")}
        />
        <Button
          icon={FaUserTie}
          label="Supplier Management"
          onClick={() => navigate("/dashboard/suppliers")}
        />
        <Button
          icon={FaTools}
          label="Employees Management"
          onClick={() => navigate("/dashboard/employees")}
        />
        <div className="relative">
          <Button
            icon={FaChartBar}
            label="Reports"
            onClick={() => setIsReportsExpanded(!isReportsExpanded)}
          />
          {isReportsExpanded && (
            <div className="ml-6 mt-2 space-y-2">
              <button
                onClick={() => navigate("/dashboard/reports/sales")}
                className="block px-4 py-2 text-sm font-medium bg-[#F9F7F7] hover:bg-[#3F72AF] hover:text-white rounded-lg transition"
              >
                Sales Report
              </button>
              <button
                onClick={() => navigate("/dashboard/reports/inventory")}
                className="block px-4 py-2 text-sm font-medium bg-[#F9F7F7] hover:bg-[#3F72AF] hover:text-white rounded-lg transition"
              >
                Inventory Report
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <Button
            icon={MdSettings}
            label="Settings"
            onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
          />
          {isSettingsExpanded && (
            <div className="ml-6 mt-2 space-y-2">
              <button
                onClick={() => navigate("/dashboard/settings/profile")}
                className="block px-4 py-2 text-sm font-medium bg-[#F9F7F7] hover:bg-[#3F72AF] hover:text-white rounded-lg transition"
              >
                Profile Settings
              </button>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-md w-full transition-transform transform hover:scale-105"
        >
          <FaSignOutAlt size={24} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
