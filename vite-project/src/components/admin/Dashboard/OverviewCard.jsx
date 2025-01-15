import axios from "axios";
import React, { useState, useEffect } from "react";

const OverviewCards = () => {
  const [employees, setEmployees] = useState(0); // Initialize with a default value
  const [products, setProducts] = useState(0);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/employees");
        console.log(response.data); // Inspect data structure
        setEmployees(response.data.length || 0); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees(0); // Fallback in case of error
      }
    };

    fetchEmployees();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        console.log(response.data); // Inspect data structure
        setProducts(response.data.length || 0); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching employees:", error);
        setProducts(0); // Fallback in case of error
      }
    };

    fetchProducts();
  }, []);

  const cards = [
    { title: "Total Views", value: "3,456K", change: "0.45%" },
    { title: "Total Profit", value: "$45.2K", change: "4.35%" },
    { title: "Total Products", value: products, change: "2.59%" },
    { title: "Total Employees", value: employees, change: "1.95%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-4 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
          <p className="text-xl font-bold">{card.value}</p>
          <p className="text-sm text-green-500">↑ {card.change}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
