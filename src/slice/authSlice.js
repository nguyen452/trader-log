import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
    const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const data = await response.json();
    // what every is receive back from the backend
    if (data.message === 'User is authenticated.') {
        return data
    } else {
        throw new Error(data.message);
    }
});



const authSlice = createSlice({
    name: "authenticate",
    initialState: {
        isAuthenticated: false,
        userId: null,
        email: null,
        firstName: null,
        lastName: null,
        isLoading: false,
        hasError: false
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.userId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.userId = action.payload.userId;
                state.email = action.payload.email;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.hasError = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export const selectIsAuthenticated = (state) => state.authenticate.isAuthenticated;
export const selectUserId = (state) => state.authenticate.userId;
export const selectEmail = (state) => state.authenticate.email;
export const selectFirstName = (state) => state.authenticate.firstName;
export const selectLastName = (state) => state.authenticate.lastName;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
