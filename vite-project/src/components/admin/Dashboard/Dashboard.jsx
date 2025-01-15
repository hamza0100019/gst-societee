import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import OverviewCards from "./OverviewCard";
import ChartSection from "./ChartSection";
import ActivitySection from "./ActivitySection";
import QuickActions from "./QuickActions";


const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

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

        
      </div>
    </div>
  );
};

export default Dashboard;
