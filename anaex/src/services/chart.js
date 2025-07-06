import axios from "axios";

const API = "http://localhost:5000/api/chart";

export const saveChart = async (payload, token) => {
    try {
        // post request for save chart is send to backend with payload and token 
        const res = await axios.post(`${API}/save`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data;

    } catch (error) {
        throw error;
    }
};

export const getHistory = async (token) => {
    try {
        const res = await axios.get(`${API}/history`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data;
    } catch (error) {
        throw error;

    }
};

export const deleteChart = async ({ chartId, token }) => {
    try {
        const res = await axios.delete(`${API}/delete/${chartId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}