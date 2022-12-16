import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setUser } from "./App/Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";

// components
import SignInComponent from "./HelperComponents/SignInComponent/SignInComponent";
import PostJobComponent from "./Components/PostJobComponent/PostJobComponent";
import AllJobsComponent from "./Components/AllJobsComponent/AllJobsComponent";
import SingleJobPostDetailsComponent from "./Components/SingleJobPostDetailsComponent/SingleJobPostDetailsComponent";
import JobApplyResumeComponent from "./Components/JobApplyResumeComponent/JobApplyResumeComponent";
import JobApplicationComponent from "./Components/JobApplicationComponent/JobApplicationComponent";
import AllUserComponent from "./Components/AllUserComponent/AllUserComponent";
import ForgetPasswordComponent from "./Components/ForgetPasswordComponent/ForgetPasswordComponent";
import ForgetPasswordChangeComponent from "./Components/ForgetPasswordChangeComponent/ForgetPasswordChangeComponent";
import EmployeesGroupComponent from "./Components/EmployeesGroupComponent/EmployeesGroupComponent";
import CreateEmployeesGroupComponent from "./Components/CreateEmployeesGroupComponent/CreateEmployeesGroupComponent";
import GroupContainerComponent from "./Components/GroupContainerComponent/GroupContainerComponent";
import ChatPreviewComponent from "./Components/ChatPreviewComponent/ChatPreviewComponent";
import ShowUserDetailsComponent from "./Components/ShowUserDetailsComponent/ShowUserDetailsComponent";
import ChatBoxComponent from "./Components/ChatBoxComponent/ChatBoxComponent";

// pages
import SignInAndLoginPage from "./Pages/SignInAndLoginPage/SignInAndLoginPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import MyAccountPage from "./Pages/MyAccountPage/MyAccountPage";
import ContactInfoComponent from "./Pages/ContactInfoComponent/ContactInfoComponent";
import AddYourResume from "./Pages/AddYourResume/AddYourResume";
import JobApplyFormPage from "./Pages/JobApplyFormPage/JobApplyFormPage";

function App() {
   const [cookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();

   useEffect(() => {
      if (cookie && cookie?._ijp_at_user) {
         dispatch(setUser(cookie._ijp_at_user));
      }
   }, []);

   return (
      <div className="App">
         <Routes>
            <Route path="/portal" element={<SignInAndLoginPage />}>
               <Route path="signin" element={<SignInComponent />} />
               <Route path="login" element={<SignInComponent />} />
               <Route path="forget-password" element={<ForgetPasswordComponent />} />
               <Route path="password-forget/:id" element={<ForgetPasswordChangeComponent />} />
            </Route>
            <Route path="/" element={<DashboardPage />}>
               <Route path="" element={<AllJobsComponent />} />
               <Route path="job/create" element={<PostJobComponent />} />
               <Route path="job/edit/:id" element={<PostJobComponent />} />
               <Route path="job/single/:name/:id" element={<SingleJobPostDetailsComponent />} />
               <Route path="my-account" element={<MyAccountPage />} />
               <Route path="contact" element={<ContactInfoComponent />} />
               <Route path="resume" element={<AddYourResume />} />
               <Route path="applications" element={<JobApplicationComponent />} />
               <Route path="all-users" element={<AllUserComponent />} />
               <Route path="groups" element={<EmployeesGroupComponent />} />
               <Route path="groups/create" element={<CreateEmployeesGroupComponent />} />
               <Route path="groups/:name/:id" element={<GroupContainerComponent />}>
                  <Route path="" element={<ChatPreviewComponent />} />
                  <Route path="chat" element={<ChatBoxComponent />} />
                  <Route path=":userId" element={<ShowUserDetailsComponent />} />
               </Route>
            </Route>
            <Route path="/beta/form" element={<JobApplyFormPage />}>
               <Route path="resume/:id" element={<JobApplyResumeComponent />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;
