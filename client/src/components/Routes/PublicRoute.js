import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    if (localStorage.getItem("token")) {
        // If the user is authenticated, redirect to the home page
        return <Navigate to="/" />;
    } else {
        // If the user is not authenticated, render the children components
        return children;
    }
};

export default PublicRoute;
