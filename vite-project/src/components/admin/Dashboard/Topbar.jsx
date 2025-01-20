import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import imag from "C:\\xampp\\htdocs\\gst-societee\\vite-project\\src\\assets\\im.png";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications from the activities table
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/activities");
      setNotifications(response.data); // Populate notifications with API response
    } catch (error) {
      console.error("Error fetching notifications:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Fetch notifications on component mount
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
        />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative text-gray-600 hover:text-gray-800"
          >
            <FaBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading notifications...
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-gray-100 border-b last:border-none"
                    >
                      <p className="text-sm text-gray-700">{notification.description}</p>
                      <p className="text-xs text-gray-500">
                        Type: <span className="capitalize">{notification.type}</span>
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <p>You don't have any notifications at the moment.</p>
                  </div>
                )}
              </div>
              <div className="p-4 text-center">
                <button
                  onClick={() => setNotifications([])} // Clear notifications locally
                  className="text-sm text-blue-500 hover:underline"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <img src={imag} alt="profile" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  );
};

export default Topbar;
