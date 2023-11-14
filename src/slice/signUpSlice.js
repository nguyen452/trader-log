import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk('signUp/createUser', async({firstName, lastName, username, email, password}) => {
    const response = await fetch('http://localhost:4000/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password:  password
        })
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message)
    }
});

const signUpSlice = createSlice({
    name: 'createUser',
    initialState: {
        isCreated: false,
        isLoading: false,
        hasError: false,
        userId: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreated = true;
                state.userId = action.payload.userId;
                state.hasError = false;
            })
            .addCase(signUp.rejected, (state) => {
                state.isLoading =false;
                state.hasError = true;
            })
    }
});

export const selectIsCreated = (state) => state.createUser.isCreated;
export default signUpSlice.reducer;
