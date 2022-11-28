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
   allJobApplications: null,
   allJobApplicationsFetchLoading: false,
   allJobApplicationsFetchError: null,
   singleJobApplication: null,
   singleJobApplicationFetchLoading: false,
   singleJobApplicationFetchError: null,
   allJobs: null,
   allJobsFetchLoading: false,
   allJobsFetchError: null,
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

      bulder
         .addCase(getAllJobApplications.pending, (state) => {
            state.allJobApplications = null;
            state.allJobApplicationsFetchLoading = true;
            state.allJobApplicationsFetchError = null;
         })
         .addCase(getAllJobApplications.rejected, (state, action) => {
            state.allJobApplications = null;
            state.allJobApplicationsFetchLoading = false;
            state.allJobApplicationsFetchError = action.error.message;
         })
         .addCase(getAllJobApplications.fulfilled, (state, action) => {
            state.allJobApplications = action.payload.data;
            state.allJobApplicationsFetchLoading = false;
            state.allJobApplicationsFetchError = null;
         });

      bulder
         .addCase(getSingleJobApplication.pending, (state) => {
            state.singleJobApplication = null;
            state.singleJobApplicationFetchLoading = true;
            state.singleJobApplicationFetchError = null;
         })
         .addCase(getSingleJobApplication.rejected, (state, action) => {
            state.singleJobApplication = null;
            state.singleJobApplicationFetchLoading = false;
            state.singleJobApplicationFetchError = action.error.message;
         })
         .addCase(getSingleJobApplication.fulfilled, (state, action) => {
            state.singleJobApplication = action.payload.data;
            state.singleJobApplicationFetchLoading = false;
            state.singleJobApplicationFetchError = null;
         });
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const getAllJobPosts = createAsyncThunk(
   'admin/getAllJobPosts',
   async (_, { rejectWithValue }) => {
      try {
         const jobResponse = await axios.get(`/index/get-all-job-posts`, headers);
         return jobResponse;
      } catch (err) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const postNewJob = createAsyncThunk(
   'admin/postNewJob',
   async (data, { rejectWithValue }) => {
      try {
         const postResponse = await axios.post(
            `/admin/inert-new-job-post/${data.token}`,
            data,
            headers
         );
         return postResponse;
      } catch (err) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateJobPost = createAsyncThunk(
   'admin/updateJobPost',
   async (data, { rejectWithValue }) => {
      try {
         const updateJobPostResponse = await axios.patch(
            `/admin/update-job-post/${data.token}`,
            data,
            headers
         );
         return updateJobPostResponse;
      } catch (err) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleJobPostDetails = createAsyncThunk(
   'admin/getSingleJobPostInfo',
   async (data, { rejectWithValue }) => {
      try {
         const jobResponse = await axios.get(
            `/admin/get-single-job-post-info/${data.token}?postId=${data.jobId}`,
            headers
         );
         return jobResponse;
      } catch (err) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteSingleJobPost = createAsyncThunk(
   'admin/deleteSingleJobPost',
   async (data, { rejectWithValue }) => {
      try {
         const postResponse = await axios.delete(
            `/admin/delete-single-post/${data.token}?postId=${data.postId}`,
            headers
         );
         return postResponse;
      } catch (err) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllJobApplications = createAsyncThunk(
   'admin/getAllJobApplications',
   async ({ token, page }, { rejectWithValue }) => {
      try {
         const applicationsResponse = await axios.get(
            `/admin/get-all-job-application/${token}?page=${page}`,
            headers
         );
         return applicationsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleJobApplication = createAsyncThunk(
   'admin/getSingleJobAplpication',
   async ({ token, jobId }, { rejectWithValue }) => {
      try {
         const SingleJobApplicationResponse = await axios.get(
            `/admin/get-single-job-application/${token}?jobId=${jobId}`,
            headers
         );
         return SingleJobApplicationResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const { removeJobPostInfo, removeSingleJobPostInfo } = adminSlice.actions;

export default adminSlice;
