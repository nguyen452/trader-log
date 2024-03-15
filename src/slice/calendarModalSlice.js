import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCalendarModalData = createAsyncThunk(
    'calendarModal/getCalendarModalData',
    async ({ year, month }) => {
        let tradeData;
        const response = await fetch(`http://localhost:4000/api/calendar/tradesData?year=${year}&month=${month}`, {
            method: "Get",
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            tradeData = data;
        }
        return tradeData;
    }
);

const calendarModalSlice = createSlice({
    name: 'calendarModal',
    initialState: {
        isLoading: false,
        hasError: false,
        tradeData: {profitsPerDay: {}, getNumberOfTradesPerDay: {}},
        monthProfit: 0,
        month: null,
        year: null,
        isOpen: false,
        dateSelected: null,
    },
    reducers: {
        openModal: (state, action) => {
            state.month = action.payload.month;
            state.year = action.payload.year;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.tradeData = {profitsPerDay: {}, getNumberOfTradesPerDay: {}};
            state.monthProfit = 0;
            state.month = null;
            state.year = null;
            state.dateSelected = null;
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        },
        setDate: (state, action) => {
            state.dateSelected = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCalendarModalData.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getCalendarModalData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tradeData = action.payload;
                const monthlyProfit = Object.values(action.payload.profitsPerDay).reduce((acc, profit) => {
                    return acc + profit;
                }, 0);
                state.monthProfit = monthlyProfit;
            })
            .addCase(getCalendarModalData.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export const { openModal, closeModal, setMonth, setYear, setDate } = calendarModalSlice.actions;
export const selectMonth = state => state.calendarModal.month;
export const selectYear = state => state.calendarModal.year;
export const selectIsLoading = state => state.calendarModal.isLoading;
export const selectHasError = state => state.calendarModal.hasError;
export const selectTradeData = state => state.calendarModal.tradeData;
export const selectIsOpen = state => state.calendarModal.isOpen;
export const selectMonthProfit = state => state.calendarModal.monthProfit;
export const selectDateSelected = state => state.calendarModal.dateSelected;
export default calendarModalSlice.reducer;
