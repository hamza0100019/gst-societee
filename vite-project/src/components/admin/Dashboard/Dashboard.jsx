import React from "react";
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
  );
};

export default Dashboard;
