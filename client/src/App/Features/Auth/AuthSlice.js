import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { headers } from '../../../axiosConfig';

const INITAL_STATE = {
   user: null,
   userAuthLoading: false,
   userAuthError: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState: INITAL_STATE,
   reducers: {
      setUser: (state, action) => {
         state.user = {
            success: true,
            userObject: action.payload,
         };
      },
      logOutUser: (state, action) => {
         state.user = action.payload;
      },
   },
   extraReducers: (bulder) => {
      // sign in user
      bulder
         .addCase(signInUser.pending, (state) => {
            state.user = null;
            state.userAuthError = null;
            state.userAuthLoading = true;
         })
         .addCase(signInUser.rejected, (state, action) => {
            state.user = null;
            state.userAuthLoading = false;
            state.userAuthError = action.error.message;
         })
         .addCase(signInUser.fulfilled, (state, action) => {
            state.user = action.payload.data;
            state.userAuthError = null;
            state.userAuthLoading = false;
         });

      // login in user
      bulder
         .addCase(logInUser.pending, (state) => {
            state.userAuthLoading = true;
            state.userAuthError = null;
            state.user = null;
         })
         .addCase(logInUser.rejected, (state, action) => {
            state.user = null;
            state.userAuthLoading = false;
            state.userAuthError = action.error.message;
         })
         .addCase(logInUser.fulfilled, (state, action) => {
            state.user = action.payload.data;
            state.userAuthError = null;
            state.userAuthLoading = false;
         });
   },
});

// sign in user
export const signInUser = createAsyncThunk('auth/signIn', async (data) => {
   const signInResponse = await axios.post('/auth/signin-user', data, headers);
   return signInResponse;
});

// login in user
export const logInUser = createAsyncThunk('auth/login', async (data) => {
   const loginUserResponse = await axios.get(
      `/auth/login-user?email=${data.email}&password=${data.password}`,
      headers
   );
   return loginUserResponse;
});

export const { setUser, logOutUser } = authSlice.actions;

export default authSlice;
