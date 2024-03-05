import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchJournalEntry = createAsyncThunk(
    'journalModal/fetchJournalEntry',
    async (thunkAPI) => {
        const response = await fetch('http://localhost:4000/api/journal/entry:date', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const journalEntry = await response.json();
            return journalEntry;
        } else {
            throw new Error('Unable to fetch journal entry');
        }
    }
);

const journalModalSlice = createSlice({
    name: 'journalModal',
    initialState: {
        isLoading: false,
        hasError: false,
        journalEntry: null,
        date: null,
        isOpen: false
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.journalEntry = null;
            state.date = null;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJournalEntry.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchJournalEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.journalEntry = action.payload;
            })
            .addCase(fetchJournalEntry.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
})


export const { openModal, closeModal, setDate } = journalModalSlice.actions;
export const selectJournalEntry = (state) => state.journalModal.journalEntry;
export const selectJournalDate = (state) => state.journalModal.date;
export const selectIsModalOpen = (state) => state.journalModal.isOpen;
export default journalModalSlice.reducer;
