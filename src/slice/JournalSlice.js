import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paginateData from "../utils/paginateData";

export const fetchJournalPageData = createAsyncThunk(
    'journal/fetchJournal',
    async (_, thunkAPI) => {
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

        const uriEncodedDates = paginatedDates.map(date => `date=${encodeURIComponent(date)}`).join("&")

        const response2 = await fetch(`http://localhost:4000/api/journal/tradesData?${uriEncodedDates}`, {
            method: "Get",
            credentials: "include"
        });
        if (response2.ok) {
            const data = await response2.json();
            tradeData = data;
        }
        return {dates, tradeData, paginatedDates};
    }
)

export const createJournalEntry = createAsyncThunk(
    'journal/createJournalEntry',
    async ({date, entry, hasTrade}) => {
        const response = await fetch('http://localhost:4000/api/journal/entry', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date, entry, hasTrade})
        })

        if (response.ok) {
            const journalEntry = await response.json()
            const date = journalEntry.date
            return date
        } else {
            throw new Error('Unable to create journal entry');
        }
    }
)



const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isLoading: false,
        hasError: false,
        dates: [],
        data: {},
        page: 1,
        paginatedDates: [],
        createEntryDate: null
    },
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        },
        setCreateEntryDate: (state, action) => {
            state.createEntryDate = action.payload;
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
                state.paginatedDates = action.payload.paginatedDates;
            })
            .addCase(fetchJournalPageData.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            // create journal entry
            .addCase(createJournalEntry.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(createJournalEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                const newDateToAdd = action.payload;
                state.dates.push(newDateToAdd);
                state.dates.sort((a, b) => new Date(b) - new Date(a))
            })
            .addCase(createJournalEntry.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })

    }
})

export const { changePage, setCreateEntryDate } = journalSlice.actions;
export const selectCreateEntryDate = state => state.journal.createEntryDate;
export const selectJournalDates = state => state.journal.dates;
export const selectJournalEntryData = state => state.journal.journalEntryData;
export const selectJournalPageNumber = state => state.journal.page;
export const selectJournalData = state => state.journal.data;
export const selectJournalIsLoading = state => state.journal.isLoading;
export const selectJournalHasError = state => state.journal.hasError;
export const selectPaginatedDates = state => state.journal.paginatedDates;
export default journalSlice.reducer;
