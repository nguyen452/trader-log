import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paginateData from "../utils/paginateData";

export const fetchJournalPageData = createAsyncThunk(
    'journal/fetchJournal',
    async (_, thunkAPI) => {
        console.log("called")
        let dates = []
        let tradeData;
        const page = thunkAPI.getState().journal.page;

        const response1 = await fetch(
            `http://localhost:4000/api/journal/dates`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        if (response1.ok) {
            const data = await response1.json();
            dates = data;
        } else {
            throw new Error('Unable to fetch journal');
        }

        const paginatedDates = paginateData(dates, 7, page)
        console.log(paginatedDates)

        const uriEncodedDates = paginatedDates.map(date => `date=${encodeURIComponent(date)}`).join("&")

        const response2 = await fetch(`http://localhost:4000/api/journal/tradesData?${uriEncodedDates}`, {
            method: "Get",
            credentials: "include"
        });
        console.log(response2)
        if (response2.ok) {
            const data = await response2.json();
            tradeData = data;
        }
        return {dates, tradeData};
    }
)


const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isLoading: false,
        hasError: false,
        dates: [],
        data: {},
        journalEntryData: null,
        page: 1,
    },
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch journal dates
            .addCase(fetchJournalPageData.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchJournalPageData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.dates = action.payload.dates;
                state.data = action.payload.tradeData;
            })
            .addCase(fetchJournalPageData.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            // fetch journal entry by date
            // .addCase(fetchJournalEntryByDate.pending, (state) => {
            //     state.isLoading = true;
            //     state.hasError = false;
            // })
            // .addCase(fetchJournalEntryByDate.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.hasError = false;
            //     state.journalEntryData = action.payload;
            // })
            // .addCase(fetchJournalEntryByDate.rejected, (state) => {
            //     state.isLoading = false;
            //     state.hasError = true;
            // })
            // fetch journal trades stats
            // .addCase(fetchJournalTradesStats.pending, (state) => {
            //     state.isLoading = true;
            //     state.hasError = false;
            // })
            // .addCase(fetchJournalTradesStats.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.hasError = false;
            //     state.stats = action.payload;
            // })
            // .addCase(fetchJournalTradesStats.rejected, (state) => {
            //     state.isLoading = false;
            //     state.hasError = true;
            // })
    }
})

export const { changePage } = journalSlice.actions;
export const selectJournalDates = state => state.journal.dates;
export const selectJournalEntryData = state => state.journal.journalEntryData;
export const selectJournalPageNumber = state => state.journal.page;
export const selectJournalData = state => state.journal.data;
export const selectJournalIsLoading = state => state.journal.isLoading;
export const selectJournalHasError = state => state.journal.hasError;
export default journalSlice.reducer;
