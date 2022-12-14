import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, multipartData } from "../../../axiosConfig";

const INITAL_STATE = {
   singleJobPost: null,
   singleJobPostFetchLoading: false,
   singleJobPostFetchError: null,
   singleJobPost: null,
   userContactSaveInfo: null,
   userContactSaveLoading: false,
   userContactSaveError: null,
   userContactInformation: null,
   userContactInformationFetchLoading: false,
   userContactInformationFetchError: null,
   saveUserResumeResponse: null,
   saveUserResumeLoading: false,
   saveUserResumeError: null,
   userResumeDetails: null,
   userResumeDetailsFetchLoading: false,
   userResumeDetailsFetchError: null,
   jobSubmitionResponse: null,
   jobSubmitionFetchLoading: false,
   jobSubmitionFetchError: null,
   allPinnedProjects: null,
   getAllPinnedProjectsLoading: false,
   allPinnedProjectsFetchError: null,
   groupLists: null,
   groupListsLoading: false,
   groupListsFetchError: null,
};

const indexSlice = createSlice({
   name: "index",
   initialState: INITAL_STATE,
   reducers: {
      removeContactUpdateInformation: (state, action) => {
         state.userContactSaveInfo = action.payload;
      },
      removeUserResumeDetails: (state, action) => {
         state.userResumeDetails = action.payload;
      },
      removeJobSubmitionInformation: (state, action) => {
         state.jobSubmitionResponse = action.payload;
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

      // save user resume information
      bulder
         .addCase(saveUserResumeInformation.pending, (state) => {
            state.saveUserResumeResponse = null;
            state.saveUserResumeLoading = true;
            state.saveUserResumeError = null;
         })
         .addCase(saveUserResumeInformation.rejected, (state, action) => {
            state.saveUserResumeResponse = null;
            state.saveUserResumeLoading = false;
            state.saveUserResumeError = action.error.message;
         })
         .addCase(saveUserResumeInformation.fulfilled, (state, action) => {
            state.saveUserResumeResponse = action.payload.data;
            state.saveUserResumeLoading = false;
            state.saveUserResumeError = null;
         });

      // user resume data fetch
      bulder
         .addCase(fetchUserResumeInformation.pending, (state) => {
            state.userResumeDetails = null;
            state.userResumeDetailsFetchLoading = true;
            state.userResumeDetailsFetchError = null;
         })
         .addCase(fetchUserResumeInformation.rejected, (state, action) => {
            state.userResumeDetails = null;
            state.userResumeDetailsFetchLoading = false;
            state.userResumeDetailsFetchError = action.error.message;
         })
         .addCase(fetchUserResumeInformation.fulfilled, (state, action) => {
            state.userResumeDetails = action.payload.data;
            state.userResumeDetailsFetchLoading = false;
            state.userResumeDetailsFetchError = null;
         });

      bulder
         .addCase(fetchUserResumeContactInformation.pending, (state) => {
            state.userResumeDetails = null;
            state.userResumeDetailsFetchLoading = true;
            state.userResumeDetailsFetchError = null;
         })
         .addCase(fetchUserResumeContactInformation.rejected, (state, action) => {
            state.userResumeDetails = null;
            state.userResumeDetailsFetchLoading = false;
            state.userResumeDetailsFetchError = action.error.message;
         })
         .addCase(fetchUserResumeContactInformation.fulfilled, (state, action) => {
            state.userResumeDetails = action.payload.data;
            state.userResumeDetailsFetchLoading = false;
            state.userResumeDetailsFetchError = null;
         });

      bulder
         .addCase(jobSubmition.pending, (state) => {
            state.jobSubmitionResponse = null;
            state.jobSubmitionFetchLoading = true;
            state.jobSubmitionFetchError = null;
         })
         .addCase(jobSubmition.rejected, (state, action) => {
            state.jobSubmitionResponse = null;
            state.jobSubmitionFetchLoading = false;
            state.jobSubmitionFetchError = action.error.message;
         })
         .addCase(jobSubmition.fulfilled, (state, action) => {
            state.jobSubmitionResponse = action.payload.data;
            state.jobSubmitionFetchLoading = false;
            state.jobSubmitionFetchError = null;
         });

      bulder
         .addCase(getPinnedProjects.pending, (state) => {
            state.allPinnedProjects = null;
            state.getAllPinnedProjectsLoading = true;
            state.allPinnedProjectsFetchError = null;
         })
         .addCase(getPinnedProjects.rejected, (state, action) => {
            state.allPinnedProjects = null;
            state.getAllPinnedProjectsLoading = false;
            state.allPinnedProjectsFetchError = action.error.message;
         })
         .addCase(getPinnedProjects.fulfilled, (state, action) => {
            state.allPinnedProjects = action.payload.data;
            state.getAllPinnedProjectsLoading = false;
            state.allPinnedProjectsFetchError = null;
         });

      bulder
         .addCase(getGroupLists.pending, (state) => {
            state.groupLists = null;
            state.groupListsLoading = true;
            state.groupListsFetchError = null;
         })
         .addCase(getGroupLists.rejected, (state, action) => {
            state.groupLists = null;
            state.groupListsLoading = false;
            state.groupListsFetchError = action.error.message;
         })
         .addCase(getGroupLists.fulfilled, (state, action) => {
            state.groupLists = action.payload.data;
            state.groupListsLoading = false;
            state.groupListsFetchError = null;
         });
   },
});

export const getSingleJobPost = createAsyncThunk(
   "index/getSingleJobPostDetail",
   async (data, { rejectWithValue }) => {
      try {
         const postResponse = await axios.get(
            `/index/get-single-post-info/${data.postId}`,
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

export const getUserContactInfo = createAsyncThunk(
   "index/getUserContactInfo",
   async (data, { rejectWithValue }) => {
      try {
         const contactInfo = await axios.get(`/index/get-user-contact-info/${data.token}`, headers);
         return contactInfo;
      } catch (err) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const saveUserContactInfo = createAsyncThunk(
   "index/saveUserContactInfo",
   async ({ token, formData }, { rejectWithValue }) => {
      try {
         const contactInfoResponse = await axios.post(
            `/index/save-user-contact-info/${token}`,
            formData,
            multipartData
         );
         return contactInfoResponse;
      } catch (err) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const saveUserResumeInformation = createAsyncThunk(
   "index/saveUserResumeData",
   async ({ formData, token }, { rejectWithValue }) => {
      try {
         const resumeResponse = await axios.post(
            `/index/save-user-resume-information/${token}`,
            formData,
            multipartData
         );

         return resumeResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const fetchUserResumeInformation = createAsyncThunk(
   "index/getUserResumeInformation",
   async (token, { rejectWithValue }) => {
      try {
         const resumeResponse = await axios.get(
            `/index/get-user-resume-information/${token}`,
            headers
         );
         return resumeResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const fetchUserResumeContactInformation = createAsyncThunk(
   "index/getUserResumeContantInformation",
   async (token, { rejectWithValue }) => {
      try {
         const userInformation = await axios.get(
            `/index/get-user-resume-content/${token}`,
            headers
         );
         return userInformation;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const jobSubmition = createAsyncThunk(
   "index/submitUserInformation",
   async ({ token, formData }, { rejectWithValue }) => {
      try {
         const submitionResponse = await axios.post(
            `/index/submit-user-information/${token}`,
            formData,
            multipartData
         );
         return submitionResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getPinnedProjects = createAsyncThunk(
   "index/getPinnedProjects",
   async ({ token }, { rejectWithValue }) => {
      try {
         const projectsResponse = await axios.get(`/index/get-pinned-projects/${token}`, headers);
         return projectsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getGroupLists = createAsyncThunk(
   "index/getGroupLists",
   async ({ token }, { rejectWithValue }) => {
      try {
         const getGroupListsResponse = await axios.get(`/index/get-group-lists/${token}`, headers);
         return getGroupListsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const {
   removeContactUpdateInformation,
   removeUserResumeDetails,
   removeJobSubmitionInformation,
} = indexSlice.actions;

export default indexSlice;
