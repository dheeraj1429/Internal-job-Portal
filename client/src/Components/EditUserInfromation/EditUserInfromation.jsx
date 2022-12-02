import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as styled from './EditUserInfromation.style';
import { VscChromeClose } from '@react-icons/all-files/vsc/VscChromeClose';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { updateUserRole } from '../../App/Features/Admin/adminSlice';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const UserRole = [{ value: 'admin' }, { value: 'subAdmin' }, { value: 'employee' }];

function EditUserInfromation({ show, eventClick, user }) {
   const [UserRoleInfo, setUserRoleInfo] = useState('');
   const dispatch = useDispatch();
   const [cookie] = useCookies(['user']);

   const ChangeHandler = (event) => {
      setUserRoleInfo(event.target.value);
   };

   const updateUserHandler = function (e) {
      e.preventDefault();
      if (!!cookie && cookie?.user && cookie?.user?.token) {
         dispatch(
            updateUserRole({ token: cookie?.user?.token, role: UserRoleInfo, userId: user._id })
         );
      }
   };

   useEffect(() => {
      if (user) {
         setUserRoleInfo(user.role);
      }
   }, [user]);

   return ReactDOM.createPortal(
      <styled.div show={show}>
         <div className="mainDiv" show={show}>
            <div className="closeButtonDiv" onClick={() => eventClick(false)}>
               <VscChromeClose />
            </div>
            <Box
               component="form"
               sx={{
                  '& > :not(style)': { my: 1, width: '100%' },
               }}
               noValidate
               autoComplete="off"
            >
               <TextField id="outlined-basic" value={user.name} variant="outlined" />
               <TextField id="outlined-basic" value={user.email} variant="outlined" />
               <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={UserRoleInfo}
                  onChange={ChangeHandler}
                  helperText="Change user role"
               >
                  {UserRole.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.value}
                     </MenuItem>
                  ))}
               </TextField>
            </Box>
            <CustomButtonComponent
               onClick={user.role === UserRoleInfo ? null : (e) => updateUserHandler(e)}
               innerText={user.role === UserRoleInfo ? 'No changes' : 'Update'}
               btnCl={'category_upload'}
            />
         </div>
      </styled.div>,
      document.getElementById('userEditPopUp')
   );
}

export default EditUserInfromation;
