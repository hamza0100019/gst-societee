import React, { useState, useEffect } from "react";
import { axiosClient, fetchCsrfToken } from "../../api/axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    expiration_date: "",
    category: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [actionLoading, setActionLoading] = useState(false); // Action-specific loading

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await fetchCsrfToken();
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        // Only append image if the user has selected a new one
        if (key !== 'image' || formData[key] !== null) {
          if (key === "expiration_date" && formData[key]) {
            formDataToSend.append(key, new Date(formData[key]).toISOString().split("T")[0]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });
  
      let response;
      if (isEditing) {
        // Update product
        response = await axiosClient.patch(
          `/api/products/${currentProductId}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setProducts((prev) =>
          prev.map((product) =>
            product.id === currentProductId ? response.data : product
          )
        );
        toast.success("Product updated successfully!");
      } else {
        // Add new product
        response = await axiosClient.post("/api/products", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) => [...prev, response.data]);
        toast.success("Product added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error.response?.data || error.message);
      toast.error("Failed to save product.");
    } finally {
      setActionLoading(false);
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
      image: null,
    });
    setIsEditing(false); // Reset editing state
    setCurrentProductId(null);
    setShowForm(false); // Close form after reset
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setCurrentProductId(product.id);
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    try {
      await fetchCsrfToken();
      await axiosClient.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      toast.error("Failed to delete product.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product Management
      </h2>

      {/* Toggle Button for Form */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            if (isEditing) resetForm(); // Reset the form if editing
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" />
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-white p-6 rounded-lg shadow-md animate-fadeIn"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 border rounded shadow-sm focus:outline-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="p-3 border rounded shadow-sm focus:outline-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="p-3 border rounded shadow-sm focus:outline-blue-500"
            required
          />
          <input
            type="date"
            placeholder="Expiration Date"
            value={formData.expiration_date}
            onChange={(e) =>
              setFormData({ ...formData, expiration_date: e.target.value })
            }
            className="p-3 border rounded shadow-sm focus:outline-blue-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="p-3 border rounded shadow-sm focus:outline-blue-500"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-3 border rounded shadow-sm col-span-full focus:outline-blue-500"
          ></textarea>

          {/* Image input should be read-only or hidden */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="p-3 border rounded shadow-sm col-span-full focus:outline-blue-500"
            disabled={isEditing} // Disable image input if in edit mode
          />

          <button
            type="submit"
            className="col-span-full bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 flex items-center justify-center"
          >
            {actionLoading ? (
              <ImSpinner2 className="animate-spin mr-2" />
            ) : (
              <FaPlus className="mr-2" />
            )}
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ImSpinner2 className="text-blue-500 text-4xl animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Image</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-100 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="border px-4 py-2">
                    <img
                      src={`http://localhost:8000/storage/${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-yellow-500 hover:text-yellow-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockManagement;
