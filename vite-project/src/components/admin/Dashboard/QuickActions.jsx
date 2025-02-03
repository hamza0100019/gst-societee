import React from "react";

const QuickActions = () => {
  return (
    <div className="mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Add Client</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">Generate Report</button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded">Create Invoice</button>
      </div>
    </div>
  );
};

export default QuickActions;
