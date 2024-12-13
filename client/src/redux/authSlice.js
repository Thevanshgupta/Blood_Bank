import {createSlice} from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

const token = localStorage.getItem("token")
? localStorage.getItem("token")
:null;
const iinitialState = {
    loading: false,
    user: null,
    token,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: iinitialState,
    reducers: { setUser(state, action) {
        state.user = action.payload;
      }},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
            })
            .addCase(userRegister.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
            })
            .addCase(getCurrentUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
