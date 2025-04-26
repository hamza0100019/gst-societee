import React, { useState, useEffect } from "react";
import { axiosClient, fetchCsrfToken } from "../../api/axios";
import { toast } from "react-hot-toast";
import { 
  MdEdit, 
  MdDelete, 
  MdAdd, 
  MdClose, 
  MdInventory, 
  MdCategory, 
  MdDescription, 
  MdAttachMoney, 
  MdNumbers, 
  MdDateRange, 
  MdImage,
  MdSearch,
  MdRefresh,
  MdSave,
  MdDashboard
} from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

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
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Extract unique categories from products
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(product => product.category))].filter(Boolean);
      setCategories(uniqueCategories);
    }
  }, [products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true)
    try {
      await fetchCsrfToken();
      const formDataToSend = new FormData();
 ['name', 'description', 'price', 'quantity', 'expiration_date', 'category'].forEach((key) => {
      let value = formData[key];
      if (key === "expiration_date" && value) {
        value = new Date(value).toISOString().split("T")[0];
      }
      formDataToSend.append(key, value);
    });

    // Gestion séparée de l'image
    if (formData.image instanceof File) {
      formDataToSend.append('image', formData.image);
    }
 
  
      let response;
      if (isEditing) {
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
        response = await axiosClient.post("/api/products", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) => [...prev, response.data]);
        toast.success("Product added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error.response?.data || error.message);
      toast.error("Failed to save product");
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
    setIsEditing(false);
    setCurrentProductId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setCurrentProductId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    setDeleteLoading(prev => ({ ...prev, [id]: true }));
    try {
      await fetchCsrfToken();
      await axiosClient.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Ce produit est utilisé ailleurs et ne peut être supprimé");
      } else {
        toast.error("Échec de la suppression");
      }
 
    } finally {
      setDeleteLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Sort and filter products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      const valueA = a[sortBy] || "";
      const valueB = b[sortBy] || "";
      
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc" 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

  // Check if product quantity is low (less than 10)
  const isLowStock = (quantity) => parseInt(quantity) < 10;

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check if product is expired or about to expire
  const getExpirationStatus = (dateString) => {
    if (!dateString) return { status: "no-expiry", text: "No Expiry" };
    
    const today = new Date();
    const expiryDate = new Date(dateString);
    const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: "expired", text: "Expired" };
    } else if (daysUntilExpiry < 30) {
      return { status: "expiring-soon", text: `Expires in ${daysUntilExpiry} days` };
    } else {
      return { status: "valid", text: formatDate(dateString) };
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header with theme toggle */}
      {/* <div className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MdDashboard className="text-3xl text-blue-500" />
            <h1 className="text-2xl font-bold">Inventory Pro</h1>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div> */}

      <div className="container mx-auto p-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className="rounded-full p-3 bg-blue-100 text-blue-600 mr-3">
              <MdInventory className="text-2xl" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className="rounded-full p-3 bg-red-100 text-red-600 mr-3">
              <MdDateRange className="text-2xl" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expiring Soon</p>
              <p className="text-2xl font-bold">
                {products.filter(p => {
                  const status = getExpirationStatus(p.expiration_date).status;
                  return status === "expiring-soon";
                }).length}
              </p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className="rounded-full p-3 bg-yellow-100 text-yellow-600 mr-3">
              <MdNumbers className="text-2xl" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Low Stock Items</p>
              <p className="text-2xl font-bold">
                {products.filter(p => isLowStock(p.quantity)).length}
              </p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className="rounded-full p-3 bg-green-100 text-green-600 mr-3">
              <MdCategory className="text-2xl" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Categories</p>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className={`flex flex-col md:flex-row justify-between mb-6 gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
          <div className="flex items-center flex-1 relative">
            <MdSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 p-2 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button
              onClick={fetchProducts}
              className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              <MdRefresh />
            </button>
            
            <button
              onClick={() => {
                setShowForm((prev) => !prev);
                if (isEditing) resetForm();
              }}
              className={`p-2 rounded-lg flex items-center ${showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition`}
            >
              {showForm ? <MdClose /> : <MdAdd />}
              <span className="ml-1 hidden md:inline">{showForm ? "Close" : "Add Product"}</span>
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className={`mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 transform transition-all duration-300 ease-in-out`}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              {isEditing ? <MdEdit className="mr-2" /> : <MdAdd className="mr-2" />}
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdInventory className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdAttachMoney className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdNumbers className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdDateRange className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="date"
                  placeholder="Expiration Date"
                  value={formData.expiration_date}
                  onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdCategory className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              
              <div className="relative md:col-span-3">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <MdDescription className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  rows="3"
                ></textarea>
              </div>

              <div className="relative md:col-span-3">
                <div className="flex items-center mb-2">
                  <MdImage className="mr-2" />
                  <span>Product Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className={`p-2 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600`}
                  disabled={isEditing}
                />
                {isEditing && (
                  <p className="mt-2 text-sm text-yellow-500">
                    <span className="flex items-center">
                      ⓘ Image upload is disabled in edit mode
                    </span>
                  </p>
                )}
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className={`mr-2 py-2 px-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition flex items-center`}
                >
                  <MdClose className="mr-1" /> Cancel
                </button>
                
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition flex items-center"
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <ImSpinner8 className="animate-spin mr-2" />
                  ) : (
                    <MdSave className="mr-2" />
                  )}
                  {isEditing ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ImSpinner8 className="text-blue-500 text-4xl animate-spin" />
          </div>
        ) : (
          <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <MdAdd className="-ml-1 mr-2 h-5 w-5" />
                    Add Product
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortBy === 'image') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('image');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        Image
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortBy === 'name') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('name');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortBy === 'category') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('category');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortBy === 'price') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('price');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortBy === 'quantity') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('quantity');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        Stock {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortBy === 'expiration_date') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('expiration_date');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        Expiry {sortBy === 'expiration_date' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {filteredProducts.map((product) => {
                      const expiryStatus = getExpirationStatus(product.expiration_date);
                      return (
                        <tr key={product.id} className={`group ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                               {product.image ? (
                                <img
                                  src={`http://localhost:8000/storage/${product.image}`}
                                  alt={product.name}
                                  className="h-12 w-12 object-cover"
                                />
                              ) : (
                                <MdImage className="text-gray-400 text-2xl" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">{product.name}</div>
                            {product.description && (
                              <div className={`text-xs truncate max-w-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {product.description}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.category ? (
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                                {product.category}
                              </span>
                            ) : (
                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                No category
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${parseFloat(product.price).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              isLowStock(product.quantity)
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {product.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              expiryStatus.status === 'expired'
                                ? 'bg-red-100 text-red-800'
                                : expiryStatus.status === 'expiring-soon'
                                ? 'bg-yellow-100 text-yellow-800'
                                : expiryStatus.status === 'valid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {expiryStatus.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2 opacity-70 group-hover:opacity-100">
                              <button
                                onClick={() => handleEdit(product)}
                                className={`p-1 rounded-full ${
                                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-yellow-100'
                                } text-yellow-500`}
                              >
                                <MdEdit className="text-lg" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className={`p-1 rounded-full ${
                                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-red-100'
                                } text-red-500`}
                                disabled={deleteLoading[product.id]}
                              >
                                {deleteLoading[product.id] ? (
                                  <ImSpinner8 className="animate-spin text-lg" />
                                ) : (
                                  <MdDelete className="text-lg" />
                                )}
                              </button>
                            </div>
                          </td>
                        
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockManagement;
