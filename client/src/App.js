import React, { useEffect, lazy, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setUser } from "./App/Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { SocketContext } from "./Context/socket";

// lazy loading screen
import LoadingScreenComponent from "./Components/LoadingScreenComponent/LoadingScreenComponent";

// components
const SignInComponent = lazy(() => import("./HelperComponents/SignInComponent/SignInComponent"));
const PostJobComponent = lazy(() => import("./Components/PostJobComponent/PostJobComponent"));
const AllJobsComponent = lazy(() => import("./Components/AllJobsComponent/AllJobsComponent"));
const SingleJobPostDetailsComponent = lazy(() =>
   import("./Components/SingleJobPostDetailsComponent/SingleJobPostDetailsComponent")
);
const JobApplyResumeComponent = lazy(() =>
   import("./Components/JobApplyResumeComponent/JobApplyResumeComponent")
);
const JobApplicationComponent = lazy(() =>
   import("./Components/JobApplicationComponent/JobApplicationComponent")
);
const AllUserComponent = lazy(() => import("./Components/AllUserComponent/AllUserComponent"));
const ForgetPasswordComponent = lazy(() =>
   import("./Components/ForgetPasswordComponent/ForgetPasswordComponent")
);
const ForgetPasswordChangeComponent = lazy(() =>
   import("./Components/ForgetPasswordChangeComponent/ForgetPasswordChangeComponent")
);
const EmployeesGroupComponent = lazy(() =>
   import("./Components/EmployeesGroupComponent/EmployeesGroupComponent")
);
const CreateEmployeesGroupComponent = lazy(() =>
   import("./Components/CreateEmployeesGroupComponent/CreateEmployeesGroupComponent")
);
const GroupContainerComponent = lazy(() =>
   import("./Components/GroupContainerComponent/GroupContainerComponent")
);
const ShowUserDetailsComponent = lazy(() =>
   import("./Components/ShowUserDetailsComponent/ShowUserDetailsComponent")
);
const ChatContainerComponent = lazy(() =>
   import("./Components/ChatContainerComponent/ChatContainerComponent")
);

// pages
const SignInAndLoginPage = lazy(() => import("./Pages/SignInAndLoginPage/SignInAndLoginPage"));
const DashboardPage = lazy(() => import("./Pages/DashboardPage/DashboardPage"));
const MyAccountPage = lazy(() => import("./Pages/MyAccountPage/MyAccountPage"));
const ContactInfoComponent = lazy(() =>
   import("./Pages/ContactInfoComponent/ContactInfoComponent")
);
const AddYourResume = lazy(() => import("./Pages/AddYourResume/AddYourResume"));
const JobApplyFormPage = lazy(() => import("./Pages/JobApplyFormPage/JobApplyFormPage"));
const GroupNotificationComponent = lazy(() =>
   import("./Components/GroupNotificationComponent/GroupNotificationComponent")
);

function App() {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();

   useEffect(() => {
      if (cookie && cookie?._ijp_at_user) {
         dispatch(setUser(cookie._ijp_at_user));

         socket.emit("_store_user_info", {
            token: cookie?._ijp_at_user?.token,
            role: cookie?._ijp_at_user?.role,
         });

         if (cookie?._ijp_at_user?.role === "admin") {
            socket.emit("_admin_join_groups");
         }
      }
   }, []);

   return (
      <div className="App">
         <Suspense fallback={<LoadingScreenComponent />}>
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
                     <Route path="" element={<ChatContainerComponent />} />
                     <Route path=":userId" element={<ShowUserDetailsComponent />} />
                  </Route>
                  <Route path="groups-notifications" element={<GroupNotificationComponent />} />
               </Route>
               <Route path="/beta/form" element={<JobApplyFormPage />}>
                  <Route path="resume/:id" element={<JobApplyResumeComponent />} />
               </Route>
            </Routes>
         </Suspense>
      </div>
   );
}

export default App;
