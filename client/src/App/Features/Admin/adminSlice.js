import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../../../axiosConfig";
import FileDownload from "js-file-download";

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
   downloadResumeLoading: false,
   downloadResumeError: null,
   allUsers: null,
   allUsersFetchLoading: false,
   allUsersFetchError: null,
   updateUserRolePending: false,
   updateUserRoleError: null,
   userAccountDeleteInfo: null,
   userAccountDeleteLoading: false,
   userAccountDeleteError: null,
   singleUserDetails: null,
   singleUserDetailsLoading: false,
   singleUserDetailsFetchError: null,
   pinnedNotifications: null,
   pinnedNotificationsFetchLoading: false,
   pinnedNotificationsFetchError: null,
   postNewProjectRespose: null,
   postNewProjectLoading: false,
   postNewProjectFetchError: null,
   projects: null,
   projectsLoading: false,
   fetchProductsError: null,
   deleteProjectLoading: false,
   deleteProjectFetchError: null,
};

const adminSlice = createSlice({
   name: "admin",
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
      removeAccountInfo: (state) => {
         state.userAccountDeleteInfo = null;
      },
      removeProjectNotification: (state) => {
         state.postNewProjectRespose = null;
         state.postNewProjectLoading = false;
         state.postNewProjectFetchError = null;
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

      bulder
         .addCase(downloadResume.pending, (state) => {
            state.downloadResumeLoading = true;
            state.downloadResumeError = null;
         })
         .addCase(downloadResume.rejected, (state, action) => {
            state.downloadResumeLoading = false;
            state.downloadResumeError = action.error.message;
         })
         .addCase(downloadResume.fulfilled, (state, action) => {
            state.downloadResumeLoading = false;
            state.downloadResumeError = null;
         });

      bulder
         .addCase(getAllLoginUsers.pending, (state) => {
            state.allUsers = null;
            state.allUsersFetchLoading = true;
            state.allUsersFetchError = null;
         })
         .addCase(getAllLoginUsers.rejected, (state, action) => {
            state.allUsers = null;
            state.allUsersFetchLoading = false;
            state.allUsersFetchError = action.error.message;
         })
         .addCase(getAllLoginUsers.fulfilled, (state, action) => {
            state.allUsers = action.payload.data;
            state.allUsersFetchLoading = false;
            state.allUsersFetchError = null;
         });

      bulder
         .addCase(updateUserRole.pending, (state) => {
            state.updateUserRolePending = true;
            state.updateUserRoleError = null;
         })
         .addCase(updateUserRole.rejected, (state, action) => {
            state.updateUserRolePending = false;
            state.updateUserRoleError = action.error.message;
         })
         .addCase(updateUserRole.fulfilled, (state, action) => {
            state.updateUserRolePending = false;
            state.updateUserRoleError = null;
            state.allUsers.users = state.allUsers?.users.map((el) =>
               el._id === action.payload.data.userId
                  ? { ...el, role: action.payload.data.role }
                  : el
            );
         });

      bulder
         .addCase(deleteUserAccount.pending, (state) => {
            state.userAccountDeleteInfo = null;
            state.userAccountDeleteLoading = true;
            state.userAccountDeleteError = null;
         })
         .addCase(deleteUserAccount.rejected, (state, action) => {
            state.userAccountDeleteInfo = null;
            state.userAccountDeleteLoading = false;
            state.userAccountDeleteError = action.error.message;
         })
         .addCase(deleteUserAccount.fulfilled, (state, action) => {
            state.userAccountDeleteInfo = action.payload.data;
            state.userAccountDeleteLoading = false;
            state.userAccountDeleteError = null;
            state.allUsers.users = state.allUsers.users.filter(
               (el) => el._id !== action.payload.data.userId
            );
         });

      bulder
         .addCase(getUserDetails.pending, (state) => {
            state.singleUserDetails = null;
            state.singleUserDetailsLoading = true;
            state.singleUserDetailsFetchError = null;
         })
         .addCase(getUserDetails.rejected, (state, action) => {
            state.singleUserDetails = null;
            state.singleUserDetailsLoading = false;
            state.singleUserDetailsFetchError = action.error.message;
         })
         .addCase(getUserDetails.fulfilled, (state, action) => {
            state.singleUserDetails = action.payload.data;
            state.singleUserDetailsLoading = false;
            state.singleUserDetailsFetchError = null;
         });

      bulder
         .addCase(getAllNotifications.pending, (state) => {
            state.pinnedNotifications = null;
            state.pinnedNotificationsFetchLoading = true;
            state.pinnedNotificationsFetchError = null;
         })
         .addCase(getAllNotifications.rejected, (state, action) => {
            state.pinnedNotifications = null;
            state.pinnedNotificationsFetchLoading = false;
            state.pinnedNotificationsFetchError = action.error.message;
         })
         .addCase(getAllNotifications.fulfilled, (state, action) => {
            state.pinnedNotifications = action.payload.data;
            state.pinnedNotificationsFetchLoading = false;
            state.pinnedNotificationsFetchError = null;
         });

      bulder
         .addCase(postNewProject.pending, (state) => {
            state.postNewProjectRespose = null;
            state.postNewProjectLoading = true;
            state.postNewProjectFetchError = null;
         })
         .addCase(postNewProject.rejected, (state, action) => {
            state.postNewProjectRespose = null;
            state.postNewProjectLoading = false;
            state.postNewProjectFetchError = action.error.message;
         })
         .addCase(postNewProject.fulfilled, (state, action) => {
            state.postNewProjectRespose = action.payload.data;
            state.postNewProjectLoading = false;
            state.postNewProjectFetchError = null;
         });

      bulder
         .addCase(getAllProject.pending, (state, action) => {
            state.projects = null;
            state.projectsLoading = true;
            state.fetchProductsError = null;
         })
         .addCase(getAllProject.rejected, (state, action) => {
            state.projects = null;
            state.projectsLoading = false;
            state.fetchProductsError = action.error.message;
         })
         .addCase(getAllProject.fulfilled, (state, action) => {
            state.projects = action.payload.data;
            state.projectsLoading = false;
            state.fetchProductsError = null;
         });

      bulder
         .addCase(deleteJobProject.pending, (state) => {
            state.deleteProjectLoading = true;
            state.deleteProjectFetchError = null;
         })
         .addCase(deleteJobProject.rejected, (state, action) => {
            state.deleteProjectLoading = false;
            state.deleteProjectFetchError = action.error.message;
         })
         .addCase(deleteJobProject.fulfilled, (state, action) => {
            console.log(action.payload);
            state.projects = {
               ...state.projects,
               projects: state.projects?.projects?.filter(
                  (el) => el?._id !== action?.payload?.data?.jobId
               ),
            };
            state.deleteProjectLoading = false;
            state.deleteProjectFetchError = null;
         });
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const getAllJobPosts = createAsyncThunk(
   "admin/getAllJobPosts",
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
   "admin/postNewJob",
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
   "admin/updateJobPost",
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
   "admin/getSingleJobPostInfo",
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
   "admin/deleteSingleJobPost",
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
   "admin/getAllJobApplications",
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
   "admin/getSingleJobAplpication",
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

export const downloadResume = createAsyncThunk(
   "admin/downloadUserResume",
   async ({ token, resume }, { rejectWithValue }) => {
      try {
         const resumeResponse = await axios.get(
            `/admin/downloadUserResume/${token}?resume=${resume}`,
            {
               responseType: "blob",
            }
         );

         FileDownload(resumeResponse?.data, "resume.pdf");
         return resumeResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllLoginUsers = createAsyncThunk(
   "admin/getAllLoginUsers",
   async ({ token, page }, { rejectWithValue }) => {
      try {
         const users = await axios.get(`/admin/get-all-login-users/${token}?page=${page}`, headers);
         return users;
      } catch (err) {
         if (err) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const updateUserRole = createAsyncThunk(
   "admin/updateUserRole",
   async ({ token, ...others }, { rejectWithValue }) => {
      try {
         const userResponse = await axios.patch(
            `/admin/update-user-role/${token}`,
            {
               ...others,
            },
            headers
         );
         return userResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteUserAccount = createAsyncThunk(
   "admin/deleteUserAccount",
   async ({ token, userId }, { rejectWithValue }) => {
      try {
         const deleteResponse = await axios.delete(
            `/admin/delete-user-account/${token}?userId=${userId}`,
            headers
         );
         return deleteResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserDetails = createAsyncThunk(
   "admin/getUserDetails",
   async ({ token, userId }, { rejectWithValue }) => {
      try {
         const userResponse = await axios.get(
            `/admin/get-user-details/${token}?userId=${userId}`,
            headers
         );
         return userResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllNotifications = createAsyncThunk(
   "admin/getAllNotifications",
   async ({ token }, { rejectWithValue }) => {
      try {
         const notificationsRespose = await axios.get(
            `/admin/get-all-notifications/${token}`,
            headers
         );
         return notificationsRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const postNewProject = createAsyncThunk(
   "admin/postNewProject",
   async ({ token, data }, { rejectWithValue }) => {
      try {
         const postProjectRespose = await axios.post(
            `/admin/post-new-project/${token}`,
            data,
            headers
         );
         return postProjectRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllProject = createAsyncThunk(
   "admin/getAllProject",
   async ({ token, page }, { rejectWithValue }) => {
      try {
         const getAllProjectRespose = await axios.get(
            `/admin/get-all-projects/${token}?page=${page}`,
            headers
         );
         return getAllProjectRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteJobProject = createAsyncThunk(
   "admin/deleteJobProject",
   async ({ token, jobId }, { rejectWithValue }) => {
      try {
         const deleteJobRespose = await axios.delete(
            `/admin/delete-job-project/${token}?jobId=${jobId}`,
            headers
         );
         return deleteJobRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const {
   removeJobPostInfo,
   removeSingleJobPostInfo,
   removeAccountInfo,
   createEmployeesGroup,
   removeProjectNotification,
} = adminSlice.actions;

export default adminSlice;
