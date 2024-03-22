import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getFilteredDataBySelectedDay from "../utils/getFilteredDataBySelectedDay";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async (selectedPeriod) => {
        const response = await fetch(
            `http://localhost:4000/api/trades/tradeMetrics/${selectedPeriod}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data.tradingPerformanceMetrics;
        } else if (response.status === 401) {
            throw new Error("Unauthorized");
        } else {
            throw new Error("Server error");
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        isLoading: false,
        hasError: false,
        errorMessage: "",
        data: null,
        selectedPeriod: "All time",
        recentTradesPeriod: "Last 10 trades",
        recentTradesData: null,
        recentTradesFilteredData: null
    },
    reducers: {
        changePeriod: (state, action) => {
            state.selectedPeriod = action.payload;
        },
        filteredBySelectedDate: (state, action) => {
            state.data.filteredTradeByDay = getFilteredDataBySelectedDay(state.data.completeTradesInfo, action.payload)
        },
        changeRecentTradesPeriod: (state, action) => {
            state.recentTradesPeriod = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.data = action.payload;
                state.data.filteredTradeByDay = getFilteredDataBySelectedDay(state.data.completeTradesInfo, new Date(currentYear, currentMonth, currentDate))
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message;
                state.hasError = true;
            });
    },
});

export const selectDashboardData = (state) => state.dashboard.data;
export const selectDashboardIsLoading = (state) => state.dashboard.isLoading;
export const selectDashboardHasError = (state) => state.dashboard.hasError;
export const selectSelectedPeriod = (state) => state.dashboard.selectedPeriod;
export const selectFilteredTradeByDay = (state) => state.dashboard.data.filteredTradeByDay;
export const selectRecentTradesPeriod = (state) => state.dashboard.recentTradesPeriod;
export const selectErrorMessage = (state) => state.dashboard.errorMessage;
export const { changePeriod ,filteredBySelectedDate, changeRecentTradesPeriod } = dashboardSlice.actions;
export default dashboardSlice.reducer;
