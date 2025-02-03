import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import OverviewCards from "./OverviewCard";
import ChartSection from "./ChartSection";
import ActivitySection from "./ActivitySection";
import QuickActions from "./QuickActions";

import GlobalSales from "./Chartgeo";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="p-6 space-y-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
          <OverviewCards />
          <ActivitySection />
          <ChartSection />
          <GlobalSales />
          <QuickActions />
        </main>
      </div>
    </div>

import { ImSpinner2 } from "react-icons/im";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second load time

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner2 className="text-blue-500 text-6xl animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Overview Cards */}
        <OverviewCards />

        {/* Charts */}
        <ChartSection />

        {/* Activity Section */}
        <ActivitySection />

        {/* Quick Actions */}
        <QuickActions />
      </main>
    </>
  );
};

export default Dashboard;
