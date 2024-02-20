import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJournal = createAsyncThunk(
    'journal/fetchJournal',
    async () => {
        const response = await fetch(
            'http://localhost:4000/api/journal',
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Unable to fetch journal');
        }
    }
)
