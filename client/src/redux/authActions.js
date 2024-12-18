import { createAsyncThunk } from "@reduxjs/toolkit"; 
import API from "../services/API";
import { toast } from 'react-toastify';
import { setUser } from './authSlice';

export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/login", { role, email, password });
            // store token
            if (data.success) {
                localStorage.setItem("token", data.token);
                toast.success(data.message);
                window.location.replace("/");
                return data; // Return data if login is successful
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// register
export const userRegister = createAsyncThunk(
    "auth/register",
    async ({
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName
    }, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/register", {
                name,
                role,
                email,
                password,
                phone,
                organisationName,
                address,
                hospitalName
            });
            if (data.success) {
                alert("User Registerd Successfully");
                toast.success("User Registerd Successfully");
                window.location.replace("/login");
                // You may also return the data here if needed
                // return data;
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
// Example action creator to log in a user


export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await API.post('/auth/login', credentials);
    const { user } = response.data;
    
    dispatch(setUser(user)); // Ensure user is correctly set in Redux store
  } catch (error) {
    console.error("Login Error:", error);
    // Handle error
  }
};


//current user
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/auth/current-user");
            if (res && res.data) {
                return res.data;
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.message) {
                throw rejectWithValue(error.response.data.message);
            } else {
                throw rejectWithValue(error.message);
            }
        }
    }
);

