import { createSlice } from "@reduxjs/toolkit";

// it is initial state for authentication 
const initialState = {
    token: localStorage.getItem('token'), // get the token from localstorage if user already logged in 
    user: JSON.parse(localStorage.getItem('user')),// get user info from localstorage
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCreadential: (state, action) => {
            state.token = action.payload.token,
                state.user = action.payload.user,

                // save token and user data to localstorage for persistence
                localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state, action) => {
            state.token = null,
                state.user = null,
                // clear all user data from localstorage
                localStorage.clear();
        }
    }
});

export const { setCreadential, logout } = authSlice.actions;
export default authSlice.reducer;