import React, { useState, useEffect } from "react";
import axios from "axios";
import CRUDTable from "./CRUDTable";

const StockManagement = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleEdit = (stock) => {
    alert(`Edit product: ${stock.name}`);
    // Handle the edit functionality
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setStocks((prev) => prev.filter((stock) => stock.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
      <CRUDTable
        columns={["ID", "Name", "Quantity", "Price"]}
        data={stocks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StockManagement;
