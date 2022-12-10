import React, { useState } from 'react';
import * as styled from './ForgetPasswordComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { forgetPassword } from '../../App/Features/Auth/AuthSlice';

function ForgetPasswordComponent() {
   const [Email, setEmail] = useState('');
   const [Error, setError] = useState('');

   const dispatch = useDispatch();

   const {
      forgetPasswordLoading,
      forgetPasswordFetchError,
      forgetPasswordInfo,
   } = useSelector((state) => state.auth);

   const SendHandler = function () {
      if (!Email) return setError('Please enter your email');
      if (!validator.isEmail(Email))
         return setError('Please enter valid email');
      setError('');
      dispatch(forgetPassword({ email: Email }));
   };

   return (
      <styled.div className="text-center">
         <h1>Forget password</h1>
         <p className="text-gray-700 mt-2 mb-3">Enter your email</p>
         <Box
            component="form"
            sx={{
               '& > :not(style)': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
         >
            <TextField
               id="outlined-basic"
               value={Email}
               onChange={(e) => setEmail(e.target.value)}
               label="Email"
               variant="outlined"
            />
            <div className="flex items-center justify-center">
               <CustomButtonComponent
                  innerText={'Forget'}
                  btnCl={'category_upload'}
                  onClick={SendHandler}
                  isLaoding={forgetPasswordLoading}
               />
            </div>
         </Box>
         <div className="mt-2">
            {Error ? <p className="error_text">{Error}</p> : null}
            {!!forgetPasswordFetchError ? (
               <p className="error_text">{forgetPasswordFetchError}</p>
            ) : null}
            {!!forgetPasswordInfo ? <p>{forgetPasswordInfo.message}</p> : null}
         </div>
      </styled.div>
   );
}

export default ForgetPasswordComponent;
