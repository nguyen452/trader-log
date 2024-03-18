import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTradeData = createAsyncThunk(
    'trades/fetchTradeData',
    async (id) => {
        const response = await fetch(`http://localhost:4000/api/trades/${id}`, {
            method: "GET",
            credentials: "include"
        });
        if (response.ok) {
            const tradeData = await response.json();
            return tradeData;
        } else {
            throw new Error('Unable to fetch trade data');
        }
    }
)

export const fetchTradingViewData = createAsyncThunk(
    'trades/fetchTradingViewData',
    async ({startDate, endDate, timeframe, symbol}) => {
        const response = await fetch(`http://localhost:4000/api/marketData/?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}&timeframe=${timeframe}`, {
            method: "GET",
            credentials: "include"
        });
        if (response.ok) {
            const tradingViewData = await response.json();
            return tradingViewData;
        } else {
            throw new Error('Unable to fetch trading view data');
        }
    }

)
const tradesSlice = createSlice({
    name: 'trades',
    initialState: {
        isLoading: false,
        hasError: false,
        tradeData: [],
        tradingViewData:[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTradeData.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(fetchTradeData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.tradeData = action.payload;
        });
        builder.addCase(fetchTradeData.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
})

export default tradesSlice.reducer;
export const selectTradeData = (state) => state.trades.tradeData;
export const selectTradeDataLoading = (state) => state.trades.isLoading;
export const selectTradeDataError = (state) => state.trades.hasError;
