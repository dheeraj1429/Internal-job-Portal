import React, { useState } from 'react';
import * as styled from './ForgetPasswordChangeComponent.style';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import { checkPassword } from '../Helper/helper';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword } from '../../App/Features/Auth/AuthSlice';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';

function ForgetPasswordChangeComponent() {
   const [UserInfo, setUserInfo] = useState({
      password: '',
      confirmPassword: '',
   });
   const [Error, setError] = useState('');
   const [ResetPasswordTracker] = useCookies(['_jp_froget_pwd_rq']);
   const [AccessPageCookie] = useCookies(['_jp_froget_pwd_rq_access']);

   const {
      forgetUserPasswordInfo,
      forgetUserPasswordLoading,
      forgetUserPasswordFetchError,
   } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const ChangeHandler = function (event) {
      const { name, value } = event.target;
      setUserInfo({ ...UserInfo, [name]: value });
   };

   const params = useParams().id;

   const SendHandler = function () {
      if (!ResetPasswordTracker._jp_froget_pwd_rq) {
         return setError('Session expire');
      }

      if (UserInfo.password !== UserInfo.confirmPassword)
         return setError(`New password and confirm password is't match`);

      const passwordCheck = checkPassword(UserInfo.password);

      if (!passwordCheck) {
         return setError(
            'Password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
         );
      }

      setError('');
      dispatch(
         changeUserPassword({ password: UserInfo.password, userId: params })
      );
   };

   if (!AccessPageCookie._jp_froget_pwd_rq_access) {
      return <Navigate to={'/'} />;
   }

   return (
      <styled.div className="text-center">
         <h1>Reset password</h1>
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
               label="New password"
               variant="outlined"
               name="password"
               type={'password'}
               value={UserInfo.password}
               onChange={ChangeHandler}
            />
            <TextField
               id="outlined-basic"
               label="Confirm password"
               variant="outlined"
               type={'password'}
               name="confirmPassword"
               value={UserInfo.confirmPassword}
               onChange={ChangeHandler}
            />
         </Box>
         <div className="flex justify-center items-center">
            <CustomButtonComponent
               onClick={SendHandler}
               btnCl={'category_upload'}
               innerText={'Save'}
               isLaoding={forgetUserPasswordLoading}
            />
         </div>
         <div className="mt-2">
            {Error ? <p className="error_text">{Error}</p> : null}
            {!!forgetUserPasswordFetchError ? (
               <p className="error_text">{forgetUserPasswordFetchError}</p>
            ) : null}
            {!!forgetUserPasswordInfo ? (
               <p>{forgetUserPasswordInfo.message}</p>
            ) : null}
         </div>
      </styled.div>
   );
}

export default ForgetPasswordChangeComponent;
