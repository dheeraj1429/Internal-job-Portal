import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { headers } from '../../../axiosConfig';

const INITAL_STATE = {
   user: null,
   userAuthLoading: false,
   userAuthError: null,
   forgetPasswordInfo: null,
   forgetPasswordLoading: false,
   forgetPasswordFetchError: null,
   forgetUserPasswordInfo: null,
   forgetUserPasswordLoading: false,
   forgetUserPasswordFetchError: null,
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
         state.user = action.payload.data;
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

      // forget password
      bulder
         .addCase(forgetPassword.pending, (state) => {
            state.forgetPasswordInfo = null;
            state.forgetPasswordLoading = true;
            state.forgetPasswordFetchError = null;
         })
         .addCase(forgetPassword.rejected, (state, action) => {
            state.forgetPasswordInfo = null;
            state.forgetPasswordLoading = false;
            state.forgetPasswordFetchError = action.error.message;
         })
         .addCase(forgetPassword.fulfilled, (state, action) => {
            state.forgetPasswordInfo = action.payload.data;
            state.forgetPasswordLoading = false;
            state.forgetPasswordFetchError = null;
         });

      bulder
         .addCase(changeUserPassword.pending, (state) => {
            state.forgetUserPasswordInfo = null;
            state.forgetUserPasswordLoading = true;
            state.forgetUserPasswordFetchError = null;
         })
         .addCase(changeUserPassword.rejected, (state, action) => {
            state.forgetUserPasswordInfo = null;
            state.forgetUserPasswordLoading = false;
            state.forgetUserPasswordFetchError = action.error.message;
         })
         .addCase(changeUserPassword.fulfilled, (state, action) => {
            state.forgetUserPasswordInfo = action.payload.data;
            state.forgetUserPasswordLoading = false;
            state.forgetUserPasswordFetchError = null;
         });
   },
});

// sign in user
export const signInUser = createAsyncThunk(
   'auth/signIn',
   async (data, { rejectWithValue }) => {
      try {
         const signInResponse = await axios.post(
            '/auth/signin-user',
            data,
            headers
         );
         return signInResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

// login in user
export const logInUser = createAsyncThunk(
   'auth/login',
   async (data, { rejectWithValue }) => {
      try {
         const loginUserResponse = await axios.get(
            `/auth/login-user?email=${data.email}&password=${data.password}`,
            headers
         );
         return loginUserResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

// forget password
export const forgetPassword = createAsyncThunk(
   'auth/forgetPassword',
   async ({ email }, { rejectWithValue }) => {
      try {
         const forgetPasswordResponse = await axios.get(
            `/auth/forget-password?email=${email}`,
            headers
         );
         return forgetPasswordResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

// forget password change
export const changeUserPassword = createAsyncThunk(
   'auth/changeUserPassword',
   async ({ password, userId }, { rejectWithValue }) => {
      try {
         const changedResponse = await axios.patch(
            '/auth/forget-user-change-password',
            { password, userId },
            headers
         );

         return changedResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const { setUser, logOutUser } = authSlice.actions;

export default authSlice;
