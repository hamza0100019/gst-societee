import React, { useState } from "react";
import imag from "C:\\xampp\\htdocs\\gst-societee\\vite-project\\src\\assets\\logo-.png";
import {
  FaHome,
  FaUserFriends,
  FaBoxes,
  FaUserTie,
  FaTools,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";
import { MdDashboard, MdExpandMore, MdExpandLess, MdSettings } from "react-icons/md";
 import { useNavigate } from "react-router-dom";
  import { axiosClient } from '../../../api/axios';
  
const Sidebar = () => {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);
 
  const navigate = useNavigate();
  const logout = async () => {
      try {
          // Appelez la route de logout côté backend
          await axiosClient.post('/logout');
      } catch (error) {
          console.error("Erreur lors de la déconnexion : ", error);
      } finally {
          // Supprimez le token côté client
          localStorage.removeItem("auth_token");
          navigate("/login"); // Redirigez vers la page de login
      }
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 text-white flex flex-col shadow-lg font-sans overflow-y-auto">
      {/* Branding */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 flex justify-center items-center">
        <img
          src={imag}
          alt="Logo"
          className="w-32 h-32 object-cover"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Dashboard */}
        <a
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
        >
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </a>

        {/* Stock Management */}
        <a
          href="/dashboard/stock"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
        >
          <FaBoxes size={20} />
          <span>Stock Management</span>
        </a>

        {/* Client Management */}
        <a
          href="/dashboard/clients"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
        >
          <FaUserFriends size={20} />
          <span>Client Management</span>
        </a>

        {/* Supplier Management */}
        <a
          href="/dashboard/suppliers"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
        >
          <FaUserTie size={20} />
          <span>Supplier Management</span>
        </a>

        {/* Employees Management */}
        <a
          href="/dashboard/employees"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
        >
          <FaTools size={20} />
          <span>Employees Management</span>
        </a>

        {/* Submenu: Reports */}
        <div className="relative">
          <button
            onClick={() => setIsReportsExpanded(!isReportsExpanded)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition shadow-lg w-full"
          >
            <FaChartBar size={20} />
            <span>Reports</span>
            {isReportsExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
          </button>

          {isReportsExpanded && (
            <div className="ml-8 mt-2 space-y-2">
              <a
                href="/dashboard/reports/sales"
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Sales Report
              </a>
              <a
                href="/dashboard/reports/inventory"
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Inventory Report
              </a>
              <a
                href="/dashboard/reports/clients"
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Client Report
              </a>
            </div>
          )}
        </div>

        {/* Submenu: Settings */}
        <div className="relative">
          <button
            onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition shadow-lg w-full"
          >
            <MdSettings size={20} />
            <span>Settings</span>
            {isSettingsExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
          </button>

          {isSettingsExpanded && (
            <div className="ml-8 mt-2 space-y-2">
              <a
                href="/dashboard/settings/profile"
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Profile Settings
              </a>
              <a
                href="/dashboard/settings/roles"
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Role Management
              </a>
              <a
                href="/dashboard/settings/permissions"
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Permissions
              </a>
            </div>
          )}
        </div>

        {/* Logout */}
        <a
  href="" // On garde le href vide, car c'est un bouton
  onClick={(e) => {
      e.preventDefault(); // Empêche le comportement par défaut
      logout(); // Appelle la fonction de déconnexion
  }}
  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition shadow-lg mt-6"
>
  <FaSignOutAlt size={20} />
  <span>Logout</span>
</a>

      </nav>

      {/* Footer */}
      <div className="mt-auto px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-800">
        <p className="text-sm text-gray-300">© 2025 Gestion Société</p>
      </div>
    </div>
  );
};

export default Sidebar;
