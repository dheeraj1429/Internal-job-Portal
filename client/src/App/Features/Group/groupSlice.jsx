import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../../../axiosConfig";

const INITIAL_STATE = {
   employeesGroup: null,
   employeesCreateGroupLoading: false,
   groupInfo: null,
   groupInfoLoading: false,
   groupInfoFetchError: null,
};

const groupSlice = createSlice({
   name: "group",
   initialState: INITIAL_STATE,
   reducers: {
      createEmployeesGroup: (state, action) => {
         state.employeesGroup =
            action?.payload?.success && state?.employeesGroup?.groupInfo
               ? {
                    ...state.employeesGroup,
                    groupInfo: state.employeesGroup?.groupInfo.concat(action.payload?.groupInfo),
                    error: null,
                 }
               : action?.payload?.success
               ? action.payload
               : {
                    ...state.employeesGroup,
                    error: action.payload,
                 };
         state.employeesCreateGroupLoading = false;
      },
      createEmployeesGroupLoading: (state, action) => {
         state.employeesCreateGroupLoading = action.payload.data;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getUserGroups.pending, (state) => {})
         .addCase(getUserGroups.rejected, (state, action) => {
            state.employeesGroup = {
               error: action.error.message,
            };
         })
         .addCase(getUserGroups.fulfilled, (state, action) => {
            state.employeesGroup = action.payload.data;
         });

      bulder
         .addCase(getUserIncludeGroups.pending, (state) => {
            state.userGroup = null;
            state.userGroupLoading = true;
         })
         .addCase(getUserIncludeGroups.rejected, (state, action) => {
            state.employeesGroup = {
               error: action.error.message,
            };
         })
         .addCase(getUserIncludeGroups.fulfilled, (state, action) => {
            state.employeesGroup = action.payload.data;
         });

      bulder
         .addCase(getGroupUserInfo.pending, (state) => {
            state.groupInfo = null;
            state.groupInfoLoading = true;
            state.groupInfoFetchError = null;
         })
         .addCase(getGroupUserInfo.rejected, (state, action) => {
            state.groupInfo = null;
            state.groupInfoLoading = false;
            state.groupInfoFetchError = action.error.message;
         })
         .addCase(getGroupUserInfo.fulfilled, (state, action) => {
            state.groupInfo = action.payload.data;
            state.groupInfoLoading = false;
            state.groupInfoFetchError = null;
         });
   },
});

export const getUserGroups = createAsyncThunk(
   "group/getUserGroups",
   async ({ token }, { rejectWithValue }) => {
      try {
         const getAllGroups = await axios.get(`/admin/get-all-groups/${token}`, headers);
         return getAllGroups;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserIncludeGroups = createAsyncThunk(
   "group/getUserIncludeGroups",
   async ({ token }, { rejectWithValue }) => {
      try {
         const userGroupsResponse = await axios.get(
            `/index/get-user-includes-groups-info/${token}`,
            headers
         );
         return userGroupsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getGroupUserInfo = createAsyncThunk(
   "group/getGroupUserInfo",
   async ({ token, groupId }, { rejectWithValue }) => {
      try {
         const userInfoResponse = await axios.get(
            `/admin/get-group-users-infomation/:${token}?groupId=${groupId}`,
            headers
         );
         return userInfoResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const { createEmployeesGroup, createEmployeesGroupLoading } = groupSlice.actions;
export default groupSlice;
