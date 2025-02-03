import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";

const ChartSection = () => {
  const [salesData, setSalesData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [revenueTrendData, setRevenueTrendData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const COLORS = ["#112D4E", "#3F72AF", "#DBE2EF", "#F9F7F7"];

  useEffect(() => {
    axios.get("http://localhost:8000/api/sales").then((response) => {
      setSalesData(response.data);
    });
    axios.get("http://localhost:8000/api/clients").then((response) => {
      setClientData(response.data);
    });
    axios.get("http://localhost:8000/api/products").then((response) => {
      setProductData(response.data);
    });
    axios.get("http://localhost:8000/api/salaries").then((response) => {
      setSalaryData(response.data);
    });
    axios.get("http://localhost:8000/api/transactions").then((response) => {
      setTransactionData(response.data);
    });
    axios.get("http://localhost:8000/api/revenue-trend").then((response) => {
      setRevenueTrendData(response.data);
    });
    axios.get("http://localhost:8000/api/suppliers-data").then((response) => {
      setSupplierData(response.data);
    });
    axios.get("http://localhost:8000/api/expenses").then((response) => {
      setExpenseData(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Bar Chart - Sales */}
      <div className="bg-[#F9F7F7] p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#112D4E]">
          Sales Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <XAxis dataKey="month" stroke="#3F72AF" />
            <YAxis stroke="#3F72AF" />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3F72AF" />
            <Bar dataKey="profit" fill="#112D4E" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Clients */}
      <div className="bg-[#DBE2EF] p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#112D4E]">
          Client Distribution by Address
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={clientData}
              dataKey="count"
              nameKey="address"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {clientData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Salaries */}
      <div className="bg-[#F9F7F7] p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#112D4E]">
          Monthly Salaries
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salaryData}>
            <XAxis dataKey="payment_date" stroke="#3F72AF" />
            <YAxis stroke="#3F72AF" />
            <Tooltip />
            <Line type="monotone" dataKey="total_amount" stroke="#112D4E" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart - Revenue Trend */}
      <div className="bg-[#DBE2EF] p-4 shadow rounded-lg lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-[#112D4E]">
          Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueTrendData}>
            <XAxis dataKey="month" stroke="#3F72AF" />
            <YAxis stroke="#3F72AF" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3F72AF"
              fill="#DBE2EF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Suppliers */}
      <div className="bg-[#F9F7F7] p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#112D4E]">
          Supplier Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={supplierData}
              dataKey="count"
              nameKey="address"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {supplierData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;
