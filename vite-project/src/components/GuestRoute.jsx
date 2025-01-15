import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default GuestRoute;
