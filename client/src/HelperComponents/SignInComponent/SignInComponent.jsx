import React, { useState, useEffect } from 'react';
import * as styled from './SignInComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { signInUser, logInUser } from '../../App/Features/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Link, Navigate } from 'react-router-dom';

function SignInComponent() {
   const [UserInfo, setUserInfo] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });
   const [Error, setError] = useState('');
   const { userAuthLoading, user } = useSelector((state) => state.auth);

   const dispatch = useDispatch();
   const location = useLocation();
   const navigation = useNavigate();

   const changeHandler = function (e) {
      const { name, value } = e.target;
      setUserInfo({ ...UserInfo, [name]: value });
   };

   const signInHandler = function (e) {
      e.preventDefault();
      const { name, email, password, confirmPassword } = UserInfo;

      if (location.pathname === '/portal/signin') {
         if (!name && !email && !password && !confirmPassword)
            return setError('Please fill all filed');
         if (password !== confirmPassword)
            return setError("Password or confirm password is't match");
         dispatch(signInUser({ name, email, password }));
      } else if (location.pathname === '/portal/login') {
         if (!email && !password) return setError('Please fill all filed');
         dispatch(logInUser({ email, password }));
      }
   };

   useEffect(() => {
      if (!!user && user.success) {
         navigation('/');
      }
   }, [user]);

   if (!!user && !!user && user?.userObject && user?.userObject?.token) {
      return <Navigate to="/" />;
   }

   return (
      <styled.div>
         <h1>
            {location.pathname === '/portal/login' ? 'Login with account' : 'Create an account'}{' '}
         </h1>
         <p className="mb-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, dolorum?
         </p>
         <Box
            component="form"
            sx={{
               '& > :not(style)': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
         >
            {location.pathname === '/portal/login' ? null : (
               <TextField
                  onChange={changeHandler}
                  type={'text'}
                  value={UserInfo.name}
                  label="Name"
                  name="name"
                  variant="outlined"
               />
            )}
            <TextField
               onChange={changeHandler}
               type={'email'}
               value={UserInfo.email}
               label="Email"
               name="email"
               variant="outlined"
            />
            <TextField
               onChange={changeHandler}
               type={'password'}
               value={UserInfo.password}
               label="Password"
               name="password"
               variant="outlined"
            />
            {location.pathname === '/portal/login' ? null : (
               <TextField
                  onChange={changeHandler}
                  type={'password'}
                  value={UserInfo.confirmPassword}
                  label="Re-enter password"
                  name="confirmPassword"
                  variant="outlined"
               />
            )}
         </Box>
         <CustomButtonComponent
            onClick={signInHandler}
            type="submit"
            isLaoding={userAuthLoading}
            innerText={location.pathname === '/portal/login' ? 'login' : 'Create Account'}
            btnCl={'category_upload mb-2'}
         />
         {location.pathname === '/portal/login' ? (
            <span>Create an account {<Link to={'/portal/signin'}>Click here</Link>}</span>
         ) : (
            <span>Already have an account {<Link to={'/portal/login'}>Click here</Link>}</span>
         )}
         {!!Error ? <p className="error_text mt-2">{Error}</p> : null}
         {!!user && !user.success ? <p className="error_text mt-2">{user.message}</p> : null}
      </styled.div>
   );
}

export default SignInComponent;
