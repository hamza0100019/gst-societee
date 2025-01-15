import React from "react";
import ChartComponent from "./ChartComponent";

const ChartSection = () => {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Revenue",
        data: [12, 19, 3, 5, 2, 3, 10],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "#10B981",
      },
      {
        label: "Revenue",
        data: [35, 49, 60, 91, 76, 65, 70],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-bold">Revenue Trend</h3>
        <ChartComponent type="line" data={lineData} />
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-bold">Profit This Week</h3>
        <ChartComponent type="bar" data={barData} />
      </div>
    </div>
  );
};

export default ChartSection;
