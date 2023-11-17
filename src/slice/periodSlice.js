import { createSlice } from "@reduxjs/toolkit";

const periodSlice = createSlice({
    name: 'period',
    initialState: {
        period: 'All time'
    },
    reducers: {
        changePeriod: (state, action) => {
            state.period = action.payload;
        }
    }
});

export const { changePeriod } = periodSlice.actions;
export const selectSelectedPeriod = (state) => state.period.period;
export default periodSlice.reducer;
