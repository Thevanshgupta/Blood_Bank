import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../services/API';
import { getCurrentUser } from '../../redux/authActions';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    // Get user current
    const getUser = async () => {
        try {
            const { data } = await API.get("/auth/current-user");
            if (data?.success) {
                dispatch(getCurrentUser(data)); // Pass data as payload to getCurrentUser action
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []); // Add empty dependency array to ensure useEffect runs only once

    if (localStorage.getItem("token")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
