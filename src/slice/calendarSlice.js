import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCalendarYear = createAsyncThunk(
    "calendar/fetchCalendarYear",
    async () => {
        const response = await fetch(
            "http://localhost:4000/api/calendar/year",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (response.ok) {
            const years = await response.json();
            return years;
        } else if (response.status === 401) {
            throw new Error("Unauthorized");
        } else {
            throw new Error("Unable to fetch calendar data");
        }
    }
);

export const fetchCalendarYearTradeData = createAsyncThunk(
    "calendar/fetchCalendarYearTradeData",
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
        }
        return tradeData;
    }
);

const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        isLoading: false,
        hasError: false,
        errorMessage: "",
        selectedDate: new Date(),
        selectedMonth: null,
        selectedYear: null,
        years: [new Date().getFullYear()],
        tradeData: { profitsPerDay: {}, getNumberOfTradesPerDay: {} },
    },
    reducers: {
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setSelectedMonth: (state, action) => {
            state.selectedMonth = action.payload;
        },
        setSelectedYear: (state, action) => {
            state.selectedYear = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //fetchCalendarYear
            .addCase(fetchCalendarYear.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchCalendarYear.fulfilled, (state, action) => {
                state.isLoading = false;
                state.years = action.payload;
                state.selectedYear = action.payload[action.payload.length - 1];
            })
            .addCase(fetchCalendarYear.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message;
                state.hasError = true;
            })
            //fetchCalendarYearTradeData
            .addCase(fetchCalendarYearTradeData.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchCalendarYearTradeData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tradeData = action.payload;
            })
            .addCase(fetchCalendarYearTradeData.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    },
});

export const { setSelectedDate, setSelectedMonth, setSelectedYear } =
    calendarSlice.actions;
export const selectIsLoading = (state) => state.calendar.isLoading;
export const selectHasError = (state) => state.calendar.hasError;
export const selectSelectedDate = (state) => state.calendar.selectedDate;
export const selectYears = (state) => state.calendar.years;
export const selectSelectedMonth = (state) => state.calendar.selectedMonth;
export const selectSelectedYear = (state) => state.calendar.selectedYear;
export const selectTradeData = (state) => state.calendar.tradeData;
export const selectErrorMessage = (state) => state.calendar.errorMessage;
export default calendarSlice.reducer;
