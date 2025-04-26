import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt, FaClock, FaExclamationCircle } from "react-icons/fa";
import axios from "axios";

const ActivitySection = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/activities");
        setActivities(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Impossible de charger les activités. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "add":
        return <FaPlusCircle className="text-emerald-500" size={22} />;
      case "update":
        return <FaEdit className="text-indigo-500" size={22} />;
      case "delete":
        return <FaTrashAlt className="text-rose-500" size={22} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const getActivityTypeLabel = (type) => {
    switch (type) {
      case "add":
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Ajout</span>;
      case "update":
        return <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">Modification</span>;
      case "delete":
        return <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full">Suppression</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-indigo-200"></div>
          <div className="mt-4 h-4 w-32 bg-gray-200 rounded"></div>
          <div className="mt-2 h-3 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center text-red-500 mb-4">
          <FaExclamationCircle className="mr-2" size={20} />
          <h3 className="text-xl font-bold">Erreur</h3>
        </div>
        <p className="text-gray-700">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5">
        <h3 className="text-xl font-bold text-white flex items-center">
          <FaClock className="mr-2" /> Activités récentes
        </h3>
      </div>
      
      {activities.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p>Aucune activité récente à afficher</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="p-4 hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-gray-800 font-medium">
                      {activity.description}
                    </p>
                    {getActivityTypeLabel(activity.type)}
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="flex items-center">
                      <FaClock className="mr-1 text-gray-400" size={12} />
                      {formatDate(activity.created_at)}
                    </span>
                    {activity.user && (
                      <span className="ml-3 inline-flex items-center">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-1">
                          {activity.user.name.charAt(0).toUpperCase()}
                        </div>
                        {activity.user.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <div className="bg-gray-50 p-3 text-center">
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200">
          Voir toutes les activités
        </button>
      </div>
    </div>
  );
};

export default ActivitySection;
