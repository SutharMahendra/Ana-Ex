import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    columns: [],
    excelData: []
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            columns = action.payload.columns;
            excelData = action.payload.columns;
        },
        deleteData: (state, action) => {
            columns = null,
                excelData = null
        }
    }
})

