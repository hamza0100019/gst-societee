import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUserCircle, FaCog, FaSignOutAlt, FaQuestionCircle, FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch notifications from the activities table
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/activities");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileDropdown) setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement actual dark mode logic here
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...");
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} shadow-lg p-4 flex justify-between items-center relative transition-all duration-300`}>
      <div className="flex items-center">
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-indigo-700'}`}>
          GST<span className="text-blue-500">Societee</span>
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar with Icon */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 rounded-full border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-64`}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className={`relative p-2 rounded-full ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-100'} transition-all duration-200`}
            aria-label="Notifications"
          >
            <FaBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border rounded-lg shadow-2xl z-50 overflow-hidden`}>
              <div className={`p-4 ${darkMode ? 'border-b border-gray-700' : 'border-b'}`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading notifications...
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${darkMode ? 'hover:bg-gray-700 border-b border-gray-700' : 'hover:bg-blue-50 border-b'} last:border-none transition-all duration-200`}
                    >
                      <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{notification.description}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                        Type: <span className="capitalize">{notification.type}</span>
                      </p>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 block`}>
                        {new Date(notification.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>You don't have any notifications at the moment.</p>
                  </div>
                )}
              </div>
              <div className={`p-3 text-center ${darkMode ? 'border-t border-gray-700' : 'border-t'}`}>
                <button
                  onClick={() => setNotifications([])}
                  className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-500'} hover:underline`}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-100'} transition-all duration-200`}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* Profile with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="User menu"
          >
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${darkMode ? 'border-gray-600' : 'border-blue-300'} transform transition-all duration-200 hover:scale-105`}>
              <img 
                src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" 
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`hidden md:inline-block font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              Admin User
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className={`absolute right-0 mt-2 w-56 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border rounded-lg shadow-2xl z-50 overflow-hidden`}>
              <div className={`p-4 ${darkMode ? 'border-b border-gray-700' : 'border-b'} flex items-center space-x-3`}>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" 
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin User</h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>admin@example.com</p>
                </div>
              </div>
              
              <ul>
                <li>
                  <a href="/profile" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-blue-50 text-gray-700'} transition-all duration-200`}>
                    <FaUserCircle className={darkMode ? 'text-gray-400' : 'text-blue-500'} />
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <a href="/settings" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-blue-50 text-gray-700'} transition-all duration-200`}>
                    <FaCog className={darkMode ? 'text-gray-400' : 'text-blue-500'} />
                    <span>Settings</span>
                  </a>
                </li>
                <li>
                  <a href="/help" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-blue-50 text-gray-700'} transition-all duration-200`}>
                    <FaQuestionCircle className={darkMode ? 'text-gray-400' : 'text-blue-500'} />
                    <span>Help & Support</span>
                  </a>
                </li>
                <li className={darkMode ? 'border-t border-gray-700' : 'border-t'}>
                  <button 
                    onClick={handleLogout}
                    className={`w-full text-left flex items-center space-x-3 px-4 py-3 ${darkMode ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-50 text-red-600'} transition-all duration-200`}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;