import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice'
import signUpReducer from '../slice/signUpSlice'
import dashboardReducer from '../slice/dashboardSlice';
import calendarReducer from '../slice/calendarSlice';
import tradeLogReducer from '../slice/tradeLogSlice';
import journalReducer from '../slice/journalSlice';
import journalModalReducer from '../slice/journalModalSlice';
import calendarModalReducer from '../slice/calendarModalSlice';
import tradesReducer from '../slice/tradesSlice';

export const store = configureStore({
  reducer: {
    authenticate: authReducer,
    calendar: calendarReducer,
    createUser: signUpReducer,
    dashboard: dashboardReducer,
    tradeLog: tradeLogReducer,
    journal: journalReducer,
    journalModal: journalModalReducer,
    calendarModal: calendarModalReducer,
    trades: tradesReducer,
  },
});
