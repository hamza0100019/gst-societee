import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Package, 
  Users, 
  MapPin,
  RefreshCcw
} from "lucide-react";

const ChartSection = () => {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverEffect, setHoverEffect] = useState(null);

  // Palette de couleurs modernes
  const modernColors = {
    primary: [
      'rgba(99, 102, 241, 0.9)',    // Indigo
      'rgba(16, 185, 129, 0.9)',    // Emerald
      'rgba(239, 68, 68, 0.9)',     // Red
      'rgba(245, 158, 11, 0.9)',    // Amber
      'rgba(139, 92, 246, 0.9)',    // Purple
      'rgba(14, 165, 233, 0.9)',    // Sky
      'rgba(236, 72, 153, 0.9)',    // Pink
    ],
    secondary: [
      'rgba(99, 102, 241, 0.2)',    
      'rgba(16, 185, 129, 0.2)',    
      'rgba(239, 68, 68, 0.2)',     
      'rgba(245, 158, 11, 0.2)',    
      'rgba(139, 92, 246, 0.2)',    
      'rgba(14, 165, 233, 0.2)',    
      'rgba(236, 72, 153, 0.2)',    
    ],
    border: [
      'rgba(99, 102, 241, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(239, 68, 68, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(14, 165, 233, 1)',
      'rgba(236, 72, 153, 1)',
    ]
  };

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:8000/api/products"),
      axios.get("http://localhost:8000/api/clients")
    ]).then(([productsRes, clientsRes]) => {
      setProducts(productsRes.data);
      setClients(clientsRes.data);
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Regrouper les clients par adresse
  const clientsByLocation = clients.reduce((acc, client) => {
    const location = client.address || "Non spécifié";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const productLabels = products.map((p) => p.name);
  const productStock = products.map((p) => p.quantity);
  
  const categoryCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  // Options de base pour les graphiques
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          family: 'Inter, sans-serif',
          size: 13
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 12
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    }
  };

  // Données pour graphique en barres
  const barData = {
    labels: productLabels,
    datasets: [
      {
        label: "Stock Disponible",
        data: productStock,
        backgroundColor: modernColors.primary,
        borderColor: modernColors.border,
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: modernColors.border
      },
    ],
  };

  // Options pour graphique en barres
  const barOptions = {
    ...baseOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(156, 163, 175, 0.1)'
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      }
    },
    animation: {
      duration: 1500,
    }
  };

  // Données pour graphique en secteurs
  const pieData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        data: Object.values(categoryCount),
        backgroundColor: modernColors.primary,
        borderColor: modernColors.border,
        borderWidth: 1,
        hoverBackgroundColor: modernColors.border,
        hoverOffset: 10
      },
    ],
  };

  // Options pour graphique en secteurs
  const pieOptions = {
    ...baseOptions,
    cutout: '0%',
    radius: '90%',
    animation: {
      animateRotate: true,
      animateScale: true
    }
  };

  // Données pour graphique en anneau (clients par lieu)
  const doughnutData = {
    labels: Object.keys(clientsByLocation),
    datasets: [
      {
        data: Object.values(clientsByLocation),
        backgroundColor: modernColors.primary,
        borderColor: modernColors.border,
        borderWidth: 1,
        hoverBackgroundColor: modernColors.border,
        hoverOffset: 15
      },
    ],
  };

  // Options pour graphique en anneau
  const doughnutOptions = {
    ...baseOptions,
    cutout: '70%',
    radius: '90%',
    plugins: {
      ...baseOptions.plugins,
      legend: {
        ...baseOptions.plugins.legend,
        position: 'right'
      }
    }
  };

  // Données simulées pour graphique linéaire (tendances)
  const lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: "Ventes mensuelles",
        data: [65, 59, 80, 81, 56, 95],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        tension: 0.4
      },
      {
        label: "Prévisions",
        data: [28, 48, 40, 69, 86, 127],
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        tension: 0.4,
        borderDash: [5, 5]
      }
    ],
  };

  // Options pour graphique linéaire
  const lineOptions = {
    ...baseOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord analytique</h2>
        <button 
          onClick={fetchData} 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <RefreshCcw size={16} />
          Actualiser
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            className={`bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden ${hoverEffect === 'stock' ? 'ring-2 ring-indigo-400' : ''}`}
            onMouseEnter={() => setHoverEffect('stock')}
            onMouseLeave={() => setHoverEffect(null)}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Package size={20} className="text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Stock des Produits</h3>
                </div>
                <BarChart3 size={20} className="text-gray-400" />
              </div>
            </div>
            <div className="p-4 h-64">
              <ChartComponent type="bar" data={barData} options={barOptions} />
            </div>
          </div>

          <div 
            className={`bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden ${hoverEffect === 'categories' ? 'ring-2 ring-indigo-400' : ''}`}
            onMouseEnter={() => setHoverEffect('categories')}
            onMouseLeave={() => setHoverEffect(null)}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <PieChart size={20} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Répartition des Catégories</h3>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {Object.keys(categoryCount).length} catégories
                </div>
              </div>
            </div>
            <div className="p-4 h-64">
              <ChartComponent type="pie" data={pieData} options={pieOptions} />
            </div>
          </div>

          <div 
            className={`bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden ${hoverEffect === 'clients' ? 'ring-2 ring-indigo-400' : ''}`}
            onMouseEnter={() => setHoverEffect('clients')}
            onMouseLeave={() => setHoverEffect(null)}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <MapPin size={20} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Répartition des Clients par Région</h3>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {clients.length} clients
                </div>
              </div>
            </div>
            <div className="p-4 h-64">
              <ChartComponent type="doughnut" data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          <div 
            className={`bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden ${hoverEffect === 'trends' ? 'ring-2 ring-indigo-400' : ''}`}
            onMouseEnter={() => setHoverEffect('trends')}
            onMouseLeave={() => setHoverEffect(null)}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <TrendingUp size={20} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Tendances des Ventes</h3>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  <span className="text-green-500 font-semibold">+16%</span> ce mois
                </div>
              </div>
            </div>
            <div className="p-4 h-64">
              <ChartComponent type="line" data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartSection;