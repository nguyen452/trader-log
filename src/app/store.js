import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice'
import signUpReducer from '../slice/signUpSlice'

export const store = configureStore({
  reducer: {
    authenticate: authReducer,
    createUser: signUpReducer
  },
});
