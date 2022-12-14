import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/Auth/AuthSlice";
import adminSlice from "../Features/Admin/adminSlice";
import indexSlice from "../Features/index/indexSlice";
import groupSlice from "../Features/Group/groupSlice";
import logger from "redux-logger";

const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      admin: adminSlice.reducer,
      index: indexSlice.reducer,
      group: groupSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // Ignore these action types
            ignoredActions: [
               "admin/getAllJobPosts/fulfilled",
               "auth/login/fulfilled",
               "index/getUserContactInfo/fulfilled",
               "index/getUserResumeInformation/fulfilled",
               "index/saveUserResumeData/fulfilled",
               "index/saveUserContactInfo/fulfilled",
               "index/getSingleJobPostDetail/fulfilled",
               "index/getUserResumeContantInformation/fulfilled",
               "admin/getAllJobApplications/fulfilled",
               "auth/signIn/fulfilled",
               "admin/getAllLoginUsers/fulfilled",
               "group/getUserGroups/fulfilled",
               "index/getUserIncludeGroups/fulfilled",
               "group/getGroupUserInfo/fulfilled",
               "group/getUserIncludeGroups/fulfilled",
               "admin/getUserDetails/fulfilled",
               "group/fetchGroupChats/fulfilled",
               "admin/getAllNotifications/fulfilled",
               "admin/postNewProject/fulfilled",
               "admin/getAllProject/fulfilled",
               "admin/deleteJobProject/fulfilled",
               "index/getPinnedProjects/fulfilled",
               "index/getGroupLists/fulfilled",
            ],
         },
      }),
   // .prepend(logger),
});

export default store;
