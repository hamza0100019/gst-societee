import React from "react";
import { FaUserCircle, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate(); // Utilisé pour la navigation entre les pages

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-md">
      {/* Lien vers Dashboard */}
      <div className="text-lg font-bold text-gray-800 cursor-pointer" onClick={() => navigate("/dashboard")}>
        Dashboard
      </div>

      {/* Barre de recherche et icônes */}
      <div className="flex items-center gap-4">
        {/* Barre de recherche */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Icônes */}
        <div className="flex items-center gap-4">
          {/* Photo de profil */}
          <div className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => navigate("/profile")}>
            <FaUserCircle className="text-2xl" />
          </div>
          {/* Notification */}
          <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
            <FaBell className="text-lg" />
          </div>
          {/* Paramètres */}
          <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
            <FaCog className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
