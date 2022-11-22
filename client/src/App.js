import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { setUser } from './App/Features/Auth/AuthSlice';
import { useDispatch } from 'react-redux';

// components
import SignInComponent from './Components/SignInComponent/SignInComponent';
import PostJobComponent from './DashboardComponent/PostJobComponent/PostJobComponent';

// pages
import SignInAndLoginPage from './Pages/SignInAndLoginPage/SignInAndLoginPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';

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
            <Route path="/dashboard" element={<DashboardPage />}>
               <Route path="job" element={<PostJobComponent />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;
