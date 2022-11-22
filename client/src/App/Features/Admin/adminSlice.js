import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { headers } from '../../../axiosConfig';

const INITAL_STATE = {
   insertNewJobPost: null,
   insertNewJobPostLoading: false,
   insertNewJobPostError: null,
};

const adminSlice = createSlice({
   name: 'admin',
   initialState: INITAL_STATE,
   extraReducers: (bulder) => {
      bulder
         .addCase(postNewJob.pending, (state) => {
            state.insertNewJobPostLoading = true;
            state.insertNewJobPost = null;
            state.insertNewJobPostError = null;
         })
         .addCase(postNewJob.rejected, (state, action) => {
            state.insertNewJobPostLoading = false;
            state.insertNewJobPostError = action.error.message;
            state.insertNewJobPost = null;
         })
         .addCase(postNewJob.fulfilled, (state, action) => {
            state.insertNewJobPostLoading = false;
            state.insertNewJobPost = action.payload.data;
            state.insertNewJobPostError = null;
         });
   },
});

export const postNewJob = createAsyncThunk('admin/postNewJob', async (data) => {
   const postResponse = await axios.post(`/admin/inert-new-job-post/${data.token}`, data, headers);
   return postResponse;
});

export default adminSlice;
