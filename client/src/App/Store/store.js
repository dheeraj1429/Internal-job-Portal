import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Features/Auth/AuthSlice';
import adminSlice from '../Features/Admin/adminSlice';
import indexSlice from '../Features/index/indexSlice';
import logger from 'redux-logger';

const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      admin: adminSlice.reducer,
      index: indexSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // Ignore these action types
            ignoredActions: [
               'admin/getAllJobPosts/fulfilled',
               'auth/login/fulfilled',
               'index/getUserContactInfo/fulfilled',
               'index/getUserResumeInformation/fulfilled',
               'index/saveUserResumeData/fulfilled',
               'index/saveUserContactInfo/fulfilled',
               'index/getSingleJobPostDetail/fulfilled',
               'index/getUserResumeContantInformation/fulfilled',
               'admin/getAllJobApplications/fulfilled',
               'auth/signIn/fulfilled',
               'admin/getAllLoginUsers/fulfilled',
            ],
         },
      }),
   // .prepend(logger),
});

export default store;
