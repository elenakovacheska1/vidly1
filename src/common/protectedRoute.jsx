import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, component }) => {
	return user ? component : <Navigate to="/login" />;
};

export default ProtectedRoute;
