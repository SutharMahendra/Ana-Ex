import axios from "axios";

// this file use to connect with backend

const API = 'http://localhost:5000/api/auth';

// login funcion is used to send the post request to backend for checking if user is availabale of not
// if login successfully then it return responce like token and userdata
export const login = async (credentials) => {
    const res = await axios.post(`${API}/login`, credentials);
    return res.data;
};

// register function is used to send post request to the backend for creating new user
// if user created successfully it return the responce like token and user data
export const register = async (userData) => {
    const res = await axios.post(`${API}/register`, userData);
    return res.data;
}
