import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roundingNumbers from "../utils/roundingNumbers";


export const getCalendarModalData = createAsyncThunk(
    "calendarModal/getCalendarModalData",
    async ({ year, month }) => {
        let tradeData;
        const response = await fetch(
            `http://localhost:4000/api/calendar/tradesData?year=${year}&month=${month}`,
            {
                method: "Get",
                credentials: "include",
            }
        );
        if (response.ok) {
            const data = await response.json();
            tradeData = data;
        } else if (response.status === 401) {
            throw new Error("Unauthorized");
        } else {
            throw new Error("Server error");
        }
        return tradeData;
    }
);

export const getTradeDataByDate = createAsyncThunk(
    "calendarModal/getTradeDataByDate",
    async (date) => {
        console.log(date);
        const response = await fetch(
            `http://localhost:4000/api/calendar/tradesData:${date}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (response.ok) {
            const journalEntry = await response.json();
            return journalEntry;
        } else {
            throw new Error("Unable to fetch journal entry");
        }
    }
);
const calendarModalSlice = createSlice({
    name: "calendarModal",
    initialState: {
        isLoading: false,
        hasError: false,
        errorMessage: "",
        tradeData: { profitsPerDay: {}, getNumberOfTradesPerDay: {} },
        monthProfit: 0,
        month: null,
        year: null,
        isOpen: false,
        dateSelected: null,
        tradeDataForDateSelected: {
            totalTrades: 0,
            winRate: 0,
            totalWinningTrades: 0,
            totalLosingTrades: 0,
            totalGrossLoss: 0,
            totalGrossProfit: 0,
            largestWin: 0,
            largestLoss: 0,
            totalProfit: 0,
            completeTradesInfo: [],
        },
        isDateModalOpen: false,
    },
    reducers: {
        openModal: (state, action) => {
            state.month = action.payload.month;
            state.year = action.payload.year;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.tradeData = {
                profitsPerDay: {},
                getNumberOfTradesPerDay: {},
            };
            state.monthProfit = 0;
            state.month = null;
            state.year = null;
            state.dateSelected = null;
        },
        openDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        closeDateModal: (state) => {
            state.isDateModalOpen = false;
            state.dateSelected = null;
            state.tradeDataForDateSelected =  {
                totalTrades: 0,
                winRate: 0,
                totalWinningTrades: 0,
                totalLosingTrades: 0,
                totalGrossLoss: 0,
                totalGrossProfit: 0,
                largestWin: 0,
                largestLoss: 0,
                totalProfit: 0,
                completeTradesInfo: [],
            }
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        },
        setDate: (state, action) => {
            state.dateSelected = action.payload;
        },
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
                const monthlyProfit = Object.values(
                    action.payload.profitsPerDay
                ).reduce((acc, profit) => {
                    return acc + profit;
                }, 0);
                state.monthProfit = roundingNumbers(monthlyProfit, 2);
            })
            .addCase(getCalendarModalData.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message;
                state.hasError = true;

            })
            // get trade Data by date
            .addCase(getTradeDataByDate.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getTradeDataByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tradeDataForDateSelected = action.payload;
            })
            .addCase(getTradeDataByDate.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    },
});

export const { openModal, closeModal, setMonth, setYear, setDate, openDateModal, closeDateModal } =
    calendarModalSlice.actions;
export const selectMonth = (state) => state.calendarModal.month;
export const selectYear = (state) => state.calendarModal.year;
export const selectIsLoading = (state) => state.calendarModal.isLoading;
export const selectHasError = (state) => state.calendarModal.hasError;
export const selectTradeData = (state) => state.calendarModal.tradeData;
export const selectIsOpen = (state) => state.calendarModal.isOpen;
export const selectMonthProfit = (state) => state.calendarModal.monthProfit;
export const selectDateSelected = (state) => state.calendarModal.dateSelected;
export const selectTradeDataByDate = (state) => state.calendarModal.tradeDataForDateSelected;
export const selectIsDateModalOpen = (state) => state.calendarModal.isDateModalOpen;
export const selectErrorMessage = (state) => state.calendarModal.errorMessage;
export default calendarModalSlice.reducer;
