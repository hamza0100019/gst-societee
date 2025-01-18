import axios from "axios";
export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    withXSRFToken: true,
})
// Fetch CSRF token before each request
export const fetchCsrfToken = async () => {
    try {
      await axiosClient.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };
  
  // Add Authorization header dynamically
  axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Handle 401 errors (unauthorized)
  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("auth_token");
        window.location.href = "/login"; // Redirect to login
      }
      return Promise.reject(error);
    }
  );