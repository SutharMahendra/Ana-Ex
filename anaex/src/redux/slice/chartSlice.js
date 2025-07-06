import { createSlice, createAsyncThunk, isRejectedWithValue, isAction } from "@reduxjs/toolkit";
import { getHistory, saveChart, deleteChart } from "../../services/chart";



// this function is used to get history from backend 
export const fetchChartHistory = createAsyncThunk(
    'history/fetchChartHistory',
    async (token, { rejectWithValue }) => {
        try {
            // the request will goes to chart service to for axios request
            const response = await getHistory(token);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

);

// this is used to save data in database
export const saveChartData = createAsyncThunk(
    'history/saveChartData',
    async ({ payload, token }, { rejectWithValue }) => {
        try {
            // we get the response from backend
            const response = await saveChart({
                title: payload.title,
                chartType: payload.chartType,
                xColumn: payload.xColumn,
                yColumn: payload.yColumn,
                fileType: payload.fileType
            }, token);
            // responce is like text message;
            return response.message;
        } catch (error) {
            return rejectWithValue(error?.response?.data.message || error.message);
        }
    }
);

// this is used to delete chart from database;
export const deleteHistory = createAsyncThunk(
    'history/deleteHistory',
    async ({ chartId, token }, { rejectWithValue }) => {
        try {
            const response = await deleteChart({ chartId, token });
            return chartId;
        } catch (error) {
            return rejectWithValue(error?.response?.data.message || error.message);
        }
    }
)

const initialState = {
    chartHistory: [], // list of charts fetched from backend
    loading: false, // shows loader during the fetch/ save data
    error: null, // holds error message that comes from backend or api
    successMessage: '' // shows confirmation message after save
}

const chartSlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        // for clean and reset history from redux
        clearHistoryState: (state) => {
            state.chartHistory = [];
            state.error = null;
            state.successMessage = '';
        }
    },
    // it is use to handle three cases of thunk 

    extraReducers: (builder) => {
        builder
            // 1) first case for pending : when request start to process
            .addCase(fetchChartHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 2) second case for fulfilled : when data is successfully get
            .addCase(fetchChartHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.chartHistory = action.payload;
            })
            // 3) third case for reject : when error occure during data fetch
            .addCase(fetchChartHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // this case for succesfully chart save;
            .addCase(saveChartData.fulfilled, (state, action) => {
                state.successMessage = action.payload;
            })

            .addCase(deleteHistory.fulfilled, (state, action) => {
                state.chartHistory = state.chartHistory.filter(chart => chart._id !== action.payload);
            });

    }
})

export const { clearHistoryState } = chartSlice.actions;
export default chartSlice.reducer;