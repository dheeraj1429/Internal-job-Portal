import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { setUser } from './App/Features/Auth/AuthSlice';
import { useDispatch } from 'react-redux';

// components
import SignInComponent from './Components/SignInComponent/SignInComponent';
import PostJobComponent from './DashboardComponent/PostJobComponent/PostJobComponent';
import AllJobsComponent from './DashboardComponent/AllJobsComponent/AllJobsComponent';
import SingleJobPostDetailsComponent from './DashboardComponent/SingleJobPostDetailsComponent/SingleJobPostDetailsComponent';

// pages
import SignInAndLoginPage from './Pages/SignInAndLoginPage/SignInAndLoginPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import MyAccountPage from './Pages/MyAccountPage/MyAccountPage';
import ContactInfoComponent from './Pages/ContactInfoComponent/ContactInfoComponent';

function App() {
   const [cookie] = useCookies(['user']);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!!cookie && cookie?.user && cookie?.user?.token) {
         dispatch(setUser(cookie.user));
      }
   }, []);

   return (
      <div className="App">
         <Routes>
            <Route path="/portal" element={<SignInAndLoginPage />}>
               <Route path="signin" element={<SignInComponent />} />
               <Route path="login" element={<SignInComponent />} />
            </Route>
            <Route path="/" element={<DashboardPage />}>
               <Route path="job" element={<AllJobsComponent />} />
               <Route path="job/create" element={<PostJobComponent />} />
               <Route path="job/edit/:id" element={<PostJobComponent />} />
               <Route path="job/single/:name/:id" element={<SingleJobPostDetailsComponent />} />
               <Route path="my-account" element={<MyAccountPage />} />
               <Route path="contact" element={<ContactInfoComponent />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;
