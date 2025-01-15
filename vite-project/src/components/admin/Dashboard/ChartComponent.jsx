import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ type, data, options }) => {
  if (type === "line") {
    return <Line data={data} options={options} />;
  } else if (type === "bar") {
    return <Bar data={data} options={options} />;
  } else {
    return null; // Default fallback
  }
};

export default ChartComponent;
