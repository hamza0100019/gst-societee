import React, { useState, useEffect } from "react";
import { axiosClient, fetchCsrfToken } from "../../api/axios";
import { toast } from "react-hot-toast";
import { 
  MdEdit, 
  MdDelete, 
  MdAdd, 
  MdClose,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdNotes,
  MdSearch,
  MdRefresh,
  MdSave,
  MdPerson
} from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/clients");
      setClients(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error.response?.data || error.message);
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await fetchCsrfToken();
      const clientData = { ...formData };

      let response;
      if (isEditing) {
      
        response = await axiosClient.patch(
          `/api/clients/${currentClientId}`,
          clientData
        );
        // Mise à jour optimiste avec les données complètes
        setClients(prev => prev.map(client => 
          client.id === currentClientId ? { ...client, ...response.data } : client
        ));
          await fetchClients();
        toast.success("Client updated successfully!");
      } else {
        response = await axiosClient.post("/api/clients", clientData);
        // Ajout avec rafraîchissement des données
        await fetchClients();
        toast.success("Client added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving client:", error.response?.data || error.message);
      toast.error("Failed to save client");
    } finally {
      setActionLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: ""
    });
    setIsEditing(false);
    setCurrentClientId(null);
    setShowForm(false);
  };

  const handleEdit = (client) => {
   
    setFormData(client);
    setIsEditing(true);
    setCurrentClientId(client.id);
    setShowForm(true);

  };

  const handleDelete = async (id) => {
    setDeleteLoading(prev => ({ ...prev, [id]: true }));
    try {
      await fetchCsrfToken();
      await axiosClient.delete(`/api/clients/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));
      toast.success("Client deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete client");
    } finally {
      setDeleteLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const filteredClients = clients
    .filter(client => 
      Object.values(client).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ))
    .sort((a, b) => {
      const valueA = a[sortBy] || "";
      const valueB = b[sortBy] || "";
      
      return sortOrder === "asc" 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      
      <div className="container mx-auto p-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className="rounded-full p-3 bg-blue-100 text-blue-600 mr-3">
              <MdPerson className="text-2xl" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Clients</p>
              <p className="text-2xl font-bold">{clients.length}</p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className="rounded-full p-3 bg-green-100 text-green-600 mr-3">
              <MdNotes className="text-2xl" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Clients with Notes</p>
              <p className="text-2xl font-bold">
                {clients.filter(p => p.notes).length}
              </p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className="rounded-full p-3 bg-purple-100 text-purple-600 mr-3">
              <MdPhone className="text-2xl" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Contacts</p>
              <p className="text-2xl font-bold">
                {clients.filter(p => p.phone).length}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className={`flex flex-col md:flex-row justify-between mb-6 gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
          <div className="flex items-center flex-1 relative">
            <MdSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 p-2 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={fetchClients}
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
              <span className="ml-1 hidden md:inline">{showForm ? "Close" : "Add Client"}</span>
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className={`mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 transform transition-all duration-300 ease-in-out`}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              {isEditing ? <MdEdit className="mr-2" /> : <MdAdd className="mr-2" />}
              {isEditing ? "Edit Client" : "Add New Client"}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPerson className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPhone className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLocationOn className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div className="relative md:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <MdNotes className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <textarea
                  placeholder="Additional Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`pl-10 p-3 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  rows="3"
                ></textarea>
              </div>

              <div className="md:col-span-2 flex justify-end">
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
                  {isEditing ? "Update Client" : "Save Client"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Clients Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ImSpinner8 className="text-blue-500 text-4xl animate-spin" />
          </div>
        ) : (
          <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            {filteredClients.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium">No clients found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding a new client.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <MdAdd className="-ml-1 mr-2 h-5 w-5" />
                    Add Client
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
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortBy === 'notes') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('notes');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        Notes {sortBy === 'notes' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className={`group ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium">{client.name}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {client.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">{client.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm max-w-xs truncate">
                            {client.address || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {client.notes || 'No notes'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2 opacity-70 group-hover:opacity-100">
                            <button
                              onClick={() => handleEdit(client)}
                              className={`p-1 rounded-full ${
                                darkMode ? 'hover:bg-gray-600' : 'hover:bg-yellow-100'
                              } text-yellow-500`}
                            >
                              <MdEdit className="text-lg" />
                            </button>
                            <button
                              onClick={() => handleDelete(client.id)}
                              className={`p-1 rounded-full ${
                                darkMode ? 'hover:bg-gray-600' : 'hover:bg-red-100'
                              } text-red-500`}
                              disabled={deleteLoading[client.id]}
                            >
                              {deleteLoading[client.id] ? (
                                <ImSpinner8 className="animate-spin text-lg" />
                              ) : (
                                <MdDelete className="text-lg" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default ClientManagement;