import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrades = createAsyncThunk(
    'tradeLog/fetchTrades',
    async () => {
        const response = await fetch(
            'http://localhost:4000/api/trades/tradeMetrics/All-time',
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data.tradingPerformanceMetrics;
        } else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw new Error('Unable to fetch trades');
        }
    }
)

const tradeLogSlice = createSlice({
    name: 'tradeLog',
    initialState: {
        selectedTrade: null,
        isTradeLogOpen: false,
        searchTrades: null,
        startDate: null,
        endDate: null,
        page: 1,
        show: 50,
        data: null,
        isLoading: false,
        hasError: false,
        errorMessage: '',
    },
    reducers: {
        setSelectedTrade: (state, action) => {
            state.selectedTrade = action.payload;
        },
        setIsTradeLogOpen: (state, action) => {
            state.isTradeLogOpen = action.payload;
        },
        searchTrades: (state, action) => {
            state.searchTrades = action.payload;
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setShow: (state, action) => {
            state.show = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrades.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchTrades.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.data = action.payload;
            })
            .addCase(fetchTrades.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message;
                state.hasError = true;
            });
    }
});

export const { setSelectedTrade, setIsTradeLogOpen, searchTrades, setStartDate, setEndDate, setPage, setShow } = tradeLogSlice.actions;
export const selectSelectedTrade = state => state.tradeLog.selectedTrade;
export const selectIsTradeLogOpen = state => state.tradeLog.isTradeLogOpen;
export const selectSearchTrades = state => state.tradeLog.searchTrades;
export const selectStartDate = state => state.tradeLog.startDate;
export const selectEndDate = state => state.tradeLog.endDate;
export const selectPage = state => state.tradeLog.page;
export const selectShow = state => state.tradeLog.show;
export const selectTrades = state => state.tradeLog.data;
export const selectTradesIsLoading = state => state.tradeLog.isLoading;
export const selectTradesHasError = state => state.tradeLog.hasError;
export const selectErrorMessage = state => state.tradeLog.errorMessage;

export default tradeLogSlice.reducer;
