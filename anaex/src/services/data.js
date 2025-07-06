import axios from "axios";

const API_URL = 'http://localhost:5000/api/data';

export const uploadFile = async (file, token) => {

    // formdata is method to send file(like image, audio,video) to the backend 
    // multipart form data format
    const formData = new FormData();

    // append use to add key-value pair
    formData.append('file', file);

    const responce = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer${token}`, //send jwt token in header
        },
    });

    return responce.data;
}