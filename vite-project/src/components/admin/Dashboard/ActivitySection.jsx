import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const ActivitySection = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/activities");
        setActivities(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "add":
        return <FaPlusCircle className="text-green-500" size={20} />;
      case "update":
        return <FaEdit className="text-blue-500" size={20} />;
      case "delete":
        return <FaTrashAlt className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
      <ul className="divide-y divide-gray-300">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center gap-4 py-4 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <div>{getActivityIcon(activity.type)}</div>
            <div>
              <p className="text-sm font-medium text-gray-700">{activity.description}</p>
              <span className="text-xs text-gray-500">
                {new Date(activity.created_at).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitySection;
