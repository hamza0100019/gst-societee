import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "/world.geojson"; // Ensure this file is in the public folder

const GlobalSales = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const countryCoordinates = {
    usa: [-100.0, 40.0],
    germany: [10.0, 51.0],
    australia: [133.7751, -25.2744],
    "united kingdom": [-1.5, 52.0],
    romania: [25.0, 45.9432],
    brazil: [-55.0, -10.0],
    morocco: [-7.0926, 31.7917], // Maroc
    france: [2.2137, 46.2276], // France
    canada: [-106.3468, 56.1304], // Canada
    india: [78.9629, 20.5937], // Inde
    japan: [138.2529, 36.2048], // Japon
    china: [104.1954, 35.8617], // Chine
    south_africa: [22.9375, -30.5595], // Afrique du Sud
    egypt: [30.8025, 26.8206], // Égypte
    italy: [12.5674, 41.8719], // Italie
    spain: [-3.7492, 40.4637], // Espagne
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sales-by-country") // Endpoint from the controller
      .then((response) => {
        setData(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load sales data.");
      });
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg">
      {/* Sales Table */}
      <div className="flex-1 bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="inline-block bg-blue-500 text-white p-2 rounded-full mr-2">
            🌍
          </span>
          Sales by Country
        </h3>
        <div className="overflow-y-auto max-h-96">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Country
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Sales
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Total Clients
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Total Sales Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {item.country || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.sales}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.total_clients}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${item.total_sales_amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map with Sales Markers */}
      <div className="flex-1 bg-white p-4 shadow rounded-lg relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 150 }}
          width={800}
          height={400}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "#E5E7EB", stroke: "#D1D5DB" },
                    hover: { fill: "#93C5FD", outline: "none" },
                    pressed: { fill: "#60A5FA", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {data.map((item, index) => {
            const country = item.country ? item.country.toLowerCase() : null;
            const coordinates = countryCoordinates[country];
            if (!coordinates) return null;
            return (
              <Marker key={index} coordinates={coordinates}>
                <circle r={10} fill="#3B82F6" stroke="#000" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={-15}
                  className="text-xs font-semibold text-gray-700"
                >
                  {item.sales}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
};

export default GlobalSales;
