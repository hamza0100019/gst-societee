import React from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

const ActivitySection = () => {
  const activities = [
    { id: 1, description: "Added a new product: Laptop", time: "2 hours ago", type: "add" },
    { id: 2, description: "Updated client information: John Doe", time: "5 hours ago", type: "update" },
    { id: 3, description: "Deleted supplier: ABC Corp.", time: "1 day ago", type: "delete" },
  ];

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

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
      <ul className="divide-y divide-gray-300">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center gap-4 py-4 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{activity.description}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitySection;
