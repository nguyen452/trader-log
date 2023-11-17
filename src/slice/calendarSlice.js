import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        selectedDate: new Date(),
    },
    reducers: {
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        }
    }
});

export const { setSelectedDate } = calendarSlice.actions;
export const selectSelectedDate = state => state.calendar.selectedDate;
export default calendarSlice.reducer;
