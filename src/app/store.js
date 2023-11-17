import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice'
import signUpReducer from '../slice/signUpSlice'
import periodReducer from '../slice/periodSlice'
import calendarReducer from '../slice/calendarSlice';

export const store = configureStore({
  reducer: {
    authenticate: authReducer,
    calendar: calendarReducer,
    createUser: signUpReducer,
    period: periodReducer,
  },
});
