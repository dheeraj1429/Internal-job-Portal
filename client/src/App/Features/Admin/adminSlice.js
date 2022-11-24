import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { headers } from '../../../axiosConfig';

const INITAL_STATE = {
   insertNewJobPost: null,
   insertNewJobPostLoading: false,
   insertNewJobPostError: null,
   singleJobPostFetchLoading: false,
   singleJobPostFetchError: null,
   deleteSinglePostInfo: null,
   deleteSinglePostLoading: false,
   deleteSinglePostError: null,
};

const adminSlice = createSlice({
   name: 'admin',
   initialState: INITAL_STATE,
   reducers: {
      removeJobPostInfo: (state) => {
         state.insertNewJobPost = null;
         state.insertNewJobPostLoading = false;
         state.insertNewJobPostError = null;
      },
      removeSingleJobPostInfo: (state) => {
         state.singleJobPost = null;
         state.singleJobPostFetchLoading = false;
         state.singleJobPostFetchError = null;
      },
   },
   extraReducers: (bulder) => {
      // post new job
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

      // get single post job information
      bulder
         .addCase(getSingleJobPostDetails.pending, (state) => {
            state.singleJobPost = null;
            state.singleJobPostFetchLoading = true;
            state.singleJobPostFetchError = null;
         })
         .addCase(getSingleJobPostDetails.rejected, (state, action) => {
            state.singleJobPost = null;
            state.singleJobPostFetchLoading = false;
            state.singleJobPostFetchError = action.error.message;
         })
         .addCase(getSingleJobPostDetails.fulfilled, (state, action) => {
            state.singleJobPost = action.payload.data;
            state.singleJobPostFetchLoading = false;
            state.singleJobPostFetchError = null;
         });

      // update job post
      bulder
         .addCase(updateJobPost.pending, (state) => {
            state.insertNewJobPostLoading = true;
            state.insertNewJobPost = null;
            state.insertNewJobPostError = null;
         })
         .addCase(updateJobPost.rejected, (state, action) => {
            state.insertNewJobPostLoading = false;
            state.insertNewJobPostError = action.error.message;
            state.insertNewJobPost = null;
         })
         .addCase(updateJobPost.fulfilled, (state, action) => {
            state.insertNewJobPostLoading = false;
            state.insertNewJobPost = action.payload.data;
            state.insertNewJobPostError = null;
         });

      // delete single job post
      bulder
         .addCase(deleteSingleJobPost.pending, (state) => {
            state.deleteSinglePostInfo = null;
            state.deleteSinglePostLoading = true;
            state.deleteSinglePostError = null;
         })
         .addCase(deleteSingleJobPost.rejected, (state, action) => {
            state.deleteSinglePostInfo = null;
            state.deleteSinglePostLoading = false;
            state.deleteSinglePostError = action.error.message;
         })
         .addCase(deleteSingleJobPost.fulfilled, (state, action) => {
            state.deleteSinglePostInfo = action.payload.data;
            state.deleteSinglePostLoading = false;
            state.deleteSinglePostError = null;
            state.allJobs.allJobs = action.payload.data?.deletePostId
               ? state.allJobs.allJobs.filter((el) => el._id !== action.payload.data?.deletePostId)
               : state.allJobs.allJobs;
         });
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const postNewJob = createAsyncThunk('admin/postNewJob', async (data) => {
   const postResponse = await axios.post(`/admin/inert-new-job-post/${data.token}`, data, headers);
   return postResponse;
});

export const updateJobPost = createAsyncThunk('admin/updateJobPost', async (data) => {
   const updateJobPostResponse = await axios.patch(
      `/admin/update-job-post/${data.token}`,
      data,
      headers
   );
   return updateJobPostResponse;
});

export const getSingleJobPostDetails = createAsyncThunk(
   'admin/getSingleJobPostInfo',
   async (data) => {
      const jobResponse = await axios.get(
         `/admin/get-single-job-post-info/${data.token}?postId=${data.jobId}`,
         headers
      );
      console.log(data);
      return jobResponse;
   }
);

export const deleteSingleJobPost = createAsyncThunk('admin/deleteSingleJobPost', async (data) => {
   const postResponse = await axios.delete(
      `/admin/delete-single-post/${data.token}?postId=${data.postId}`,
      headers
   );
   return postResponse;
});

export const { removeJobPostInfo, removeSingleJobPostInfo } = adminSlice.actions;

export default adminSlice;
