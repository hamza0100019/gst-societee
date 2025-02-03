import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDollarSign, FaUsers, FaUserPlus, FaShoppingCart } from "react-icons/fa";

const ActivitySection = () => {
  const [data, setData] = useState(null); // Stockage des données de l'API
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Récupérer les données depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/activity-section") // Remplacez par votre endpoint API
      .then((response) => {
        setData(response.data); // Stocker les données dans le state
        setLoading(false); // Désactiver l'indicateur de chargement
      })
      .catch((err) => {
        setError("Failed to fetch activity data."); // En cas d'erreur
        setLoading(false); // Désactiver l'indicateur de chargement
      });
  }, []);

  if (loading) {
    return <p>Loading activity data...</p>; // Afficher un message de chargement
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Afficher une erreur si elle existe
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Carte pour Today's Money */}
      <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
        <div className="p-3 bg-blue-100 rounded-full">
          <FaDollarSign className="text-blue-500 text-xl" />
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">Today's Money</h3>
          <p className="text-2xl font-bold text-gray-800">
            ${data.todaysMoney.value}
          </p>
          <p
            className={`text-sm ${
              data.todaysMoney.percentage >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {data.todaysMoney.percentage >= 0 ? "+" : ""}
            {data.todaysMoney.percentage}%
          </p>
        </div>
      </div>

      {/* Carte pour Today's Users */}
      <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
        <div className="p-3 bg-green-100 rounded-full">
          <FaUsers className="text-green-500 text-xl" />
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">Today's Users</h3>
          <p className="text-2xl font-bold text-gray-800">
            {data.todaysUsers.value}
          </p>
          <p
            className={`text-sm ${
              data.todaysUsers.percentage >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {data.todaysUsers.percentage >= 0 ? "+" : ""}
            {data.todaysUsers.percentage}%
          </p>
        </div>
      </div>

      {/* Carte pour New Clients */}
      <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
        <div className="p-3 bg-yellow-100 rounded-full">
          <FaUserPlus className="text-yellow-500 text-xl" />
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">New Clients</h3>
          <p className="text-2xl font-bold text-gray-800">
            {data.newClients.value}
          </p>
          <p
            className={`text-sm ${
              data.newClients.percentage >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {data.newClients.percentage >= 0 ? "+" : ""}
            {data.newClients.percentage}%
          </p>
        </div>
      </div>

      {/* Carte pour Total Sales */}
      <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
        <div className="p-3 bg-purple-100 rounded-full">
          <FaShoppingCart className="text-purple-500 text-xl" />
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-800">
            ${data.totalSales.value}
          </p>
          <p className="text-sm text-gray-500">Cumulative data</p>
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
