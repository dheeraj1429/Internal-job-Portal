import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { headers } from '../../../axiosConfig';

const INITAL_STATE = {
   singleJobPost: null,
   singleJobPostFetchLoading: false,
   singleJobPostFetchError: null,
   allJobs: null,
   allJobsFetchLoading: false,
   allJobsFetchError: null,
   singleJobPost: null,
   userContactSaveInfo: null,
   userContactSaveLoading: false,
   userContactSaveError: null,
   userContactInformation: null,
   userContactInformationFetchLoading: false,
   userContactInformationFetchError: null,
};

const indexSlice = createSlice({
   name: 'index',
   initialState: INITAL_STATE,
   reducers: {
      removeContactUpdateInformation: (state, action) => {
         state.userContactSaveInfo = action.payload;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getSingleJobPost.pending, (state) => {
            state.singleJobPost = null;
            state.singleJobPostFetchLoading = true;
            state.singleJobPostFetchError = null;
         })
         .addCase(getSingleJobPost.rejected, (state, action) => {
            state.singleJobPost = null;
            state.singleJobPostFetchLoading = false;
            state.singleJobPostFetchError = action.error.message;
         })
         .addCase(getSingleJobPost.fulfilled, (state, action) => {
            state.singleJobPost = action.payload.data;
            state.singleJobPostFetchLoading = false;
            state.singleJobPostFetchError = null;
         });

      // get all posted jobs
      bulder
         .addCase(getAllJobPosts.pending, (state) => {
            state.allJobs = null;
            state.allJobsFetchLoading = true;
            state.allJobsFetchError = null;
         })
         .addCase(getAllJobPosts.rejected, (state, action) => {
            state.allJobs = null;
            state.allJobsFetchLoading = false;
            state.allJobsFetchError = action.error.message;
         })
         .addCase(getAllJobPosts.fulfilled, (state, action) => {
            state.allJobs = action.payload.data;
            state.allJobsFetchLoading = false;
            state.allJobsFetchError = null;
         });

      // update user contact info
      bulder
         .addCase(saveUserContactInfo.pending, (state) => {
            state.userContactSaveInfo = null;
            state.userContactSaveLoading = true;
            state.userContactSaveError = null;
         })
         .addCase(saveUserContactInfo.rejected, (state, action) => {
            state.userContactSaveInfo = null;
            state.userContactSaveLoading = false;
            state.userContactSaveError = action.error.message;
         })
         .addCase(saveUserContactInfo.fulfilled, (state, action) => {
            state.userContactSaveInfo = action.payload.data;
            state.userContactSaveLoading = false;
            state.userContactSaveError = null;
         });

      // get user contact information
      bulder
         .addCase(getUserContactInfo.pending, (state) => {
            state.userContactInformation = null;
            state.userContactInformationFetchLoading = true;
            state.userContactInformationFetchError = null;
         })
         .addCase(getUserContactInfo.rejected, (state, action) => {
            state.userContactInformation = null;
            state.userContactInformationFetchLoading = false;
            state.userContactInformationFetchError = action.error.message;
         })
         .addCase(getUserContactInfo.fulfilled, (state, action) => {
            state.userContactInformation = action.payload.data;
            state.userContactInformationFetchLoading = false;
            state.userContactInformationFetchError = null;
         });
   },
});

export const getAllJobPosts = createAsyncThunk('admin/getAllJobPosts', async () => {
   const jobResponse = await axios.get(`/index/get-all-job-posts`, headers);
   return jobResponse;
});

export const getSingleJobPost = createAsyncThunk('index/getSingleJobPostDetail', async (data) => {
   const postResponse = await axios.get(`/index/get-single-post-info/${data.postId}`, headers);
   return postResponse;
});

export const getUserContactInfo = createAsyncThunk('index/getUserContactInfo', async (data) => {
   const contactInfo = await axios.get(`/index/get-user-contact-info/${data.token}`, headers);
   return contactInfo;
});

export const saveUserContactInfo = createAsyncThunk('index/saveUserContactInfo', async (data) => {
   const contactInfoResponse = await axios.post(
      `/index/save-user-contact-info/${data.token}`,
      data,
      headers
   );
   return contactInfoResponse;
});

export const { removeContactUpdateInformation } = indexSlice.actions;

export default indexSlice;
