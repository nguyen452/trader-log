import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCalendarYear = createAsyncThunk(
    'calendar/fetchCalendarYear',
    async () => {
        const response = await fetch('http://localhost:4000/api/calendar/year', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const years = await response.json();
            return years;
        } else {
            throw new Error('Unable to fetch calendar data');
        }
    }
);


const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoading: false,
        hasError: false,
        selectedDate: new Date(),
        selectedMonth: null,
        selectedYear: null,
        years: [new Date().getFullYear()]

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
            .addCase(fetchCalendarYear.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchCalendarYear.fulfilled, (state, action) => {
                state.isLoading = false;
                state.years =  action.payload;
            })
            .addCase(fetchCalendarYear.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export const { setSelectedDate, setSelectedMonth, setSelectedYear } = calendarSlice.actions;
export const selectIsLoading = state => state.calendar.isLoading;
export const selectHasError = state => state.calendar.hasError;
export const selectSelectedDate = state => state.calendar.selectedDate;
export const selectYears = state => state.calendar.years;
export const selectSelectedMonth = state => state.calendar.selectedMonth;
export const selectSelectedYear = state => state.calendar.selectedYear;
export default calendarSlice.reducer;
