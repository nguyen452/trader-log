import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getJournalEntryByDate = createAsyncThunk(
    'journal/getJournalEntryByDate',
    async(date) => {
        const response = await fetch(`http://localhost:4000/api/journal/entry/${date}`, {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const journalEntry = await response.json();
            return journalEntry;
        } else {
            throw new Error('Unable to fetch journal entry');
        }
    }
)
export const updateJournalEntry = createAsyncThunk(
    'journal/updateJournalEntry',
    async( {date, entry}) => {
        console.log(date, entry)
        const response = await fetch(`http://localhost:4000/api/journal/entry/${date}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({entry})
        })
        if (response.ok) {
            const journalEntry = await response.json();
            return journalEntry;
        } else {
            throw new Error('Unable to update journal entry');
        }
    }
)



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
        },
        setJournalEntry: (state, action) => {
            state.journalEntry = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
              // fetch journal entry by date
              .addCase(getJournalEntryByDate.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getJournalEntryByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.journalEntry = action.payload.entry;
            })
            .addCase(getJournalEntryByDate.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            // update journal entry
            .addCase(updateJournalEntry.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(updateJournalEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.journalEntry = action.payload;
            })
            .addCase(updateJournalEntry.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
})


export const { openModal, closeModal, setDate, setJournalEntry } = journalModalSlice.actions;
export const selectJournalEntry = (state) => state.journalModal.journalEntry;
export const selectJournalDate = (state) => state.journalModal.date;
export const selectIsModalOpen = (state) => state.journalModal.isOpen;
export default journalModalSlice.reducer;
