import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Layout from "../layouts/layout";
import Dashboard from "../components/admin/Dashboard/Dashboard";
import StockManagement from "../components/admin/StockManagement";
  import ProtectedRoute from "../components/ProtectedRoute";
  import GuestRoute from "../components/GuestRoute";
  import { Toaster } from "react-hot-toast";
  
  export const router = createBrowserRouter([
      {
          element: <Layout />,
          children: [
              {
                  path: "/dashboard",
                  element: (
                      <ProtectedRoute>
                          <Dashboard />
                          
                      </ProtectedRoute>
                  ),
              },
              {
                path: "/dashboard/stock",
                element: (
                    <ProtectedRoute>
                        <StockManagement />
                        
                    </ProtectedRoute>
                ),
            }
            ]
        }, 
             
            {
                  path: "/login",
                  element: (
                      <GuestRoute>
                        <Toaster/>
                          <Login />
                      </GuestRoute>
                  ),
              },
              {
                path: "/",
                element: (
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                ),
            },
              
              {
                  path: "*",
                  element: "Not Found",
              },
          ]);
  
 
  