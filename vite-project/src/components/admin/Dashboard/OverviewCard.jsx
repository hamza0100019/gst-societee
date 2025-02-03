import React from "react";

const OverviewCard = ({ title, value, color }) => {
  return (
    <div className={`p-4 shadow rounded ${color} text-white`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default OverviewCard;
