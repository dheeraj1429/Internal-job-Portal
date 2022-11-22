import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Features/Auth/AuthSlice';
import adminSlice from '../Features/Admin/adminSlice';

const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      admin: adminSlice.reducer,
   },
});

export default store;
