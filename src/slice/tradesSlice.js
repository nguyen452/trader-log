import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTradeData = createAsyncThunk(
    'trades/fetchTradeData',
    async (id) => {
        let tradeData;
        let tradingViewData;

        const response = await fetch(`http://localhost:4000/api/trades/${id}`, {
            method: "GET",
            credentials: "include"
        });
        if (response.ok) {
            tradeData = await response.json();
        } else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw new Error('Unable to fetch trade data');
        }

        const symbol = tradeData.trade.symbol;
        const startDate = tradeData.trade.date_open;
        const endDate = tradeData.trade.date_close;
        const timeframe = "1min";

        const response1 = await fetch(`http://localhost:4000/api/marketData/?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}&timeframe=${timeframe}`, {
            method: "GET",
            credentials: "include"
        });
        if (response1.ok) {
            tradingViewData = await response1.json();
        } else {
            throw new Error('Unable to fetch trading view data');
        }
        return {tradeData, tradingViewData};
    }
)

// export const fetchTradingViewData = createAsyncThunk(
//     'trades/fetchTradingViewData',
//     async ({startDate, endDate, timeframe, symbol}) => {
//         const response = await fetch(`http://localhost:4000/api/marketData/?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}&timeframe=${timeframe}`, {
//             method: "GET",
//             credentials: "include"
//         });
//         if (response.ok) {
//             const tradingViewData = await response.json();
//             return tradingViewData;
//         } else {
//             throw new Error('Unable to fetch trading view data');
//         }
//     }

// )
const tradesSlice = createSlice({
    name: 'trades',
    initialState: {
        isLoading: false,
        hasError: false,
        errorMessage: "",
        tradeData: {trade: {date_close: "", symbol: "", profit: 0}, totalSharesTraded: 0, executions: [{}]},
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
            state.tradeData = action.payload.tradeData;
            state.tradingViewData = action.payload.tradingViewData;
        });
        builder.addCase(fetchTradeData.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
            state.hasError = true;
        });
    }
})

export default tradesSlice.reducer;
export const selectTradeData = (state) => state.trades.tradeData;
export const selectTradeDataLoading = (state) => state.trades.isLoading;
export const selectTradeDataError = (state) => state.trades.hasError;
export const selectTradingViewData = (state) => state.trades.tradingViewData;
export const selectErrorMessage = (state) => state.trades.errorMessage;
