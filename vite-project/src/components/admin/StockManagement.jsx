import React, { useState, useEffect } from "react";
import { axiosClient, fetchCsrfToken } from "../../api/axios";

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    expiration_date: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosClient.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchCsrfToken(); // Fetch CSRF token before making the request
      let response;
      if (isEditing) {
        // Update product
        response = await axiosClient.put(`/api/products/${currentProductId}`, formData);
        setProducts((prev) =>
          prev.map((product) =>
            product.id === currentProductId ? response.data : product
          )
        );
        alert("Product updated successfully!");
      } else {
        // Add product
        response = await axiosClient.post("/api/products", formData);
        setProducts((prev) => [...prev, response.data]);
        alert("Product added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error.response?.data || error.message);
      alert("Failed to save product. Check console for details.");
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      expiration_date: "",
      category: "",
    });
    setIsEditing(false);
    setCurrentProductId(null);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setCurrentProductId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetchCsrfToken(); // Fetch CSRF token before making the request
      await axiosClient.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      alert("Failed to delete product. Check console for details.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 border rounded shadow-sm"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="p-2 border rounded shadow-sm"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="p-2 border rounded shadow-sm"
          required
        />
        <input
          type="date"
          placeholder="Expiration Date"
          value={formData.expiration_date}
          onChange={(e) =>
            setFormData({ ...formData, expiration_date: e.target.value })
          }
          className="p-2 border rounded shadow-sm"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="p-2 border rounded shadow-sm"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="p-2 border rounded shadow-sm col-span-full"
        ></textarea>
        <button
          type="submit"
          className="col-span-full bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
  <div
    key={product.id}
    className="p-4 border rounded shadow-lg bg-white hover:shadow-xl transition"
  >
    <h3 className="text-lg font-bold mb-2">{product.name || "No Name"}</h3>
    <p className="text-gray-600 mb-2">
      <strong>Price:</strong> ${product.price || "N/A"}
    </p>
    <p className="text-gray-600 mb-2">
      <strong>Quantity:</strong> {product.quantity || "N/A"}
    </p>
    <p className="text-gray-600 mb-2">
      <strong>Expiration Date:</strong> {product.expiration_date || "N/A"}
    </p>
    <p className="text-gray-600 mb-2">
      <strong>Category:</strong> {product.category || "N/A"}
    </p>
    <p className="text-gray-600 mb-4">{product.description || "No Description"}</p>
    <div className="flex justify-between">
      <button
        onClick={() => handleEdit(product)}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(product.id)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default StockManagement;
