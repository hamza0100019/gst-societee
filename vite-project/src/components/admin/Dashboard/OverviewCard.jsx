import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Users, Package, DollarSign, BarChart2 } from "lucide-react";

const OverviewCards = () => {
  const [stats, setStats] = useState({
    employees: { count: 0, change: "0%" },
    products: { count: 0, change: "0%" },
    revenue: { value: "$0", change: "0%" },
    engagement: { value: "0", change: "0%" }
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch employees data using native fetch API
        const employeesResponse = await fetch("http://localhost:8000/api/employees");
        const employeesData = await employeesResponse.json();
        
        // Fetch products data using native fetch API
        const productsResponse = await fetch("http://localhost:8000/api/products");
        const productsData = await productsResponse.json();
        
        // Calculate random changes for demo purposes (in real app, you'd compute from historical data)
        const getRandomChange = () => (Math.random() * 8 - 2).toFixed(2);
        const empChange = getRandomChange();
        const prodChange = getRandomChange();
        const revChange = getRandomChange();
        const engChange = getRandomChange();
        
        // Calculate total revenue (example calculation based on products)
        const totalRevenue = productsData.reduce(
          (sum, product) => sum + (product.price * product.stock || 0), 
          0
        );
        
        // Calculate engagement (example: average views per product)
        const totalViews = productsData.reduce(
          (sum, product) => sum + (product.views || Math.floor(Math.random() * 1000)), 
          0
        );
        
        setStats({
          employees: { 
            count: employeesData.length, 
            change: `${empChange}%` 
          },
          products: { 
            count: productsData.length, 
            change: `${prodChange}%` 
          },
          revenue: { 
            value: `$${totalRevenue.toLocaleString()}`, 
            change: `${revChange}%` 
          },
          engagement: { 
            value: `${totalViews.toLocaleString()}`, 
            change: `${engChange}%` 
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define card configurations
  const cards = [
    {
      title: "Total Revenue",
      value: stats.revenue.value,
      change: stats.revenue.change,
      icon: <DollarSign size={20} />,
      color: "bg-gradient-to-r from-indigo-500 to-purple-600",
      isPositive: parseFloat(stats.revenue.change) >= 0
    },
    {
      title: "Total Products",
      value: stats.products.count,
      change: stats.products.change,
      icon: <Package size={20} />,
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      isPositive: parseFloat(stats.products.change) >= 0
    },
    {
      title: "Total Employees",
      value: stats.employees.count,
      change: stats.employees.change,
      icon: <Users size={20} />,
      color: "bg-gradient-to-r from-emerald-400 to-teal-600",
      isPositive: parseFloat(stats.employees.change) >= 0
    },
    {
      title: "Total Engagement",
      value: stats.engagement.value,
      change: stats.engagement.change,
      icon: <BarChart2 size={20} />,
      color: "bg-gradient-to-r from-amber-400 to-orange-600",
      isPositive: parseFloat(stats.engagement.change) >= 0
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-1 group"
        >
          <div className={`absolute inset-0 opacity-90 ${card.color}`}></div>
          <div className="relative p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="p-2 rounded-lg bg-white bg-opacity-30">
                {card.icon}
              </span>
              <span className={`flex items-center text-sm font-medium ${
                card.isPositive ? 'text-green-200' : 'text-red-200'
              }`}>
                {card.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />} {card.change}
              </span>
            </div>
            <h3 className="text-lg font-medium opacity-90">{card.title}</h3>
            <p className="text-3xl font-bold mt-1">{loading ? "..." : card.value}</p>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 group-hover:bg-opacity-40 transition-all"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;