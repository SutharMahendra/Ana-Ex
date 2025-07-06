import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slice/authSlice';
import historyReducer from '../redux/slice/chartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        history: historyReducer
    }
});