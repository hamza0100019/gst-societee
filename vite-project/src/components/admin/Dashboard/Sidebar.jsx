import React, { useState, useEffect } from "react";
import imag from "../../../assets/logo.png";
import {
  FaHome,
  FaUserFriends,
  FaBoxes,
  FaUserTie,
  FaTools,
  FaSignOutAlt,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { MdDashboard, MdExpandMore, MdExpandLess, MdSettings } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosClient } from '../../../api/axios';

const Sidebar = () => {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Déterminer si le chemin actuel correspond à l'élément de menu
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Détecter la taille de l'écran pour le responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = async () => {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    } finally {
      localStorage.removeItem("auth_token");
      navigate("/login");
    }
  };

  // Gestion des classes en fonction de l'état replié ou non
  const sidebarClasses = `
    ${isMobile ? 'fixed z-50' : 'relative'} 
    ${collapsed && !isMobile ? 'w-20' : isMobile ? (mobileOpen ? 'w-72' : 'w-0') : 'w-72'} 
    h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
    text-white flex flex-col shadow-xl font-sans transition-all duration-300 ease-in-out
    ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
    border-r border-cyan-500/20
  `;

  const menuItemClasses = "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 backdrop-blur-sm";
  const activeItemClasses = "bg-gradient-to-r from-cyan-600/80 to-blue-500/80 shadow-lg shadow-cyan-500/20";
  const inactiveItemClasses = "bg-slate-800/50 hover:bg-slate-700/50 hover:shadow-md hover:shadow-cyan-500/10";

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:from-cyan-400 hover:to-blue-400 transition-all"
        >
          {mobileOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      )}
      
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={sidebarClasses}>
        {/* Collapse Button (Desktop only) */}
        {!isMobile && (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-20 bg-slate-800 text-cyan-400 p-1.5 rounded-full shadow-lg border border-cyan-500/30 hover:bg-slate-700 transition-all z-10"
          >
            {collapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
          </button>
        )}

        {/* Branding */}
        <div className={`px-6 py-6 bg-gradient-to-r from-slate-800 to-slate-900 flex justify-center items-center border-b border-cyan-500/20 ${collapsed && !isMobile ? 'py-8' : ''}`}>
          {((!collapsed || isMobile) && (
            <img src={imag} alt="Logo" className="w-20 h-20 object-cover transition-all filter drop-shadow-xl" />
          )) || (
            <div className="rounded-full bg-white/10 p-2 shadow-inner backdrop-blur-sm border border-cyan-500/30">
              <img src={imag} alt="Logo" className="w-10 h-10 object-cover" />
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
          {/* Dashboard */}
          <a
            href="/dashboard"
            className={`${menuItemClasses} ${isActive('/dashboard') ? activeItemClasses : inactiveItemClasses} group`}
          >
            <MdDashboard size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
            {(!collapsed || isMobile) && <span className="whitespace-nowrap">Dashboard</span>}
          </a>

          {/* Stock Management */}
          <a
            href="/dashboard/stock"
            className={`${menuItemClasses} ${isActive('/dashboard/stock') ? activeItemClasses : inactiveItemClasses} group`}
          >
            <FaBoxes size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
            {(!collapsed || isMobile) && <span className="whitespace-nowrap">Stock Management</span>}
          </a>

          {/* Client Management */}
          <a
            href="/dashboard/clients"
            className={`${menuItemClasses} ${isActive('/dashboard/clients') ? activeItemClasses : inactiveItemClasses} group`}
          >
            <FaUserFriends size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
            {(!collapsed || isMobile) && <span className="whitespace-nowrap">Client Management</span>}
          </a>

          {/* Supplier Management */}
          <a
            href="/dashboard/suppliers"
            className={`${menuItemClasses} ${isActive('/dashboard/suppliers') ? activeItemClasses : inactiveItemClasses} group`}
          >
            <FaUserTie size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
            {(!collapsed || isMobile) && <span className="whitespace-nowrap">Supplier Management</span>}
          </a>

          {/* Employees Management */}
          <a
            href="/dashboard/employees"
            className={`${menuItemClasses} ${isActive('/dashboard/employees') ? activeItemClasses : inactiveItemClasses} group`}
          >
            <FaTools size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
            {(!collapsed || isMobile) && <span className="whitespace-nowrap">Employees Management</span>}
          </a>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-2"></div>

          {/* Submenu: Reports */}
          {(!collapsed || isMobile) ? (
            <div className="relative">
              <button
                onClick={() => setIsReportsExpanded(!isReportsExpanded)}
                className={`${menuItemClasses} ${location.pathname.includes('/dashboard/reports') ? activeItemClasses : inactiveItemClasses} w-full justify-between group`}
              >
                <div className="flex items-center gap-3">
                  <FaChartBar size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
                  <span className="whitespace-nowrap">Reports</span>
                </div>
                {isReportsExpanded ? 
                  <MdExpandLess size={20} className="text-cyan-300" /> : 
                  <MdExpandMore size={20} className="text-cyan-300" />
                }
              </button>

              {isReportsExpanded && (
                <div className="ml-6 mt-2 space-y-2 border-l-2 border-cyan-500/30 pl-4 transition-all">
                  <a
                    href="/dashboard/reports/sales"
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/dashboard/reports/sales') ? 'bg-cyan-600/30 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
                  >
                    Sales Report
                  </a>
                  <a
                    href="/dashboard/reports/inventory"
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/dashboard/reports/inventory') ? 'bg-cyan-600/30 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
                  >
                    Inventory Report
                  </a>
                  <a
                    href="/dashboard/reports/clients"
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/dashboard/reports/clients') ? 'bg-cyan-600/30 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
                  >
                    Client Report
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/dashboard/reports"
              className={`${menuItemClasses} ${location.pathname.includes('/dashboard/reports') ? activeItemClasses : inactiveItemClasses} group`}
              title="Reports"
            >
              <FaChartBar size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
            </a>
          )}

          {/* Submenu: Settings */}
          {(!collapsed || isMobile) ? (
            <div className="relative">
              <button
                onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                className={`${menuItemClasses} ${location.pathname.includes('/dashboard/settings') ? activeItemClasses : inactiveItemClasses} w-full justify-between group`}
              >
                <div className="flex items-center gap-3">
                  <MdSettings size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
                  <span className="whitespace-nowrap">Settings</span>
                </div>
                {isSettingsExpanded ? 
                  <MdExpandLess size={20} className="text-cyan-300" /> : 
                  <MdExpandMore size={20} className="text-cyan-300" />
                }
              </button>

              {isSettingsExpanded && (
                <div className="ml-6 mt-2 space-y-2 border-l-2 border-cyan-500/30 pl-4 transition-all">
                  <a
                    href="/dashboard/settings/profile"
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/dashboard/settings/profile') ? 'bg-cyan-600/30 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
                  >
                    Profile Settings
                  </a>
                  <a
                    href="/dashboard/settings/roles"
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/dashboard/settings/roles') ? 'bg-cyan-600/30 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
                  >
                    Role Management
                  </a>
                  <a
                    href="/dashboard/settings/permissions"
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/dashboard/settings/permissions') ? 'bg-cyan-600/30 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
                  >
                    Permissions
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/dashboard/settings"
              className={`${menuItemClasses} ${location.pathname.includes('/dashboard/settings') ? activeItemClasses : inactiveItemClasses} group`}
              title="Settings"
            >
              <MdSettings size={20} className="flex-shrink-0 text-cyan-400 group-hover:text-white transition-all" />
            </a>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-2"></div>

          {/* Logout */}
          <button
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className={`${menuItemClasses} bg-gradient-to-r from-rose-600/80 to-pink-600/80 hover:from-rose-500/80 hover:to-pink-500/80 shadow-lg shadow-rose-500/10 hover:shadow-rose-500/20 mt-6 w-full group`}
          >
            <FaSignOutAlt size={20} className="flex-shrink-0" />
            {(!collapsed || isMobile) && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </nav>

        {/* Footer */}
        {(!collapsed || isMobile) && (
          <div className="mt-auto px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-center border-t border-cyan-500/10">
            <p className="text-xs text-slate-400">© 2025 Gestion Société</p>
          </div>
        )}
      </div>

      {/* Main Content Wrapper (add this to your layout component) */}
      {!isMobile && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-50">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-full p-1 shadow-lg shadow-cyan-500/20 cursor-pointer hover:shadow-cyan-400/30 transition-all border border-cyan-500/30">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;