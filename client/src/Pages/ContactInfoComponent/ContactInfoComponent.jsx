import React, { useState, useEffect } from 'react';
import * as styled from './ContactInfoComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
   saveUserContactInfo,
   getUserContactInfo,
   removeContactUpdateInformation,
} from '../../App/Features/index/indexSlice';
import { HiOutlineArrowNarrowRight } from '@react-icons/all-files/hi/HiOutlineArrowNarrowRight';

function ContactInfoComponent() {
   const [UserContact, setUserContact] = useState({
      name: '',
      phone: '',
      street: '',
      cityState: '',
      postalCode: '',
      showNumber: false,
   });
   const [Error, setError] = useState('');
   console.log('render');

   const dispatch = useDispatch();

   const ChangeHandler = function (event) {
      const { name, value } = event.target;
      setUserContact({ ...UserContact, [name]: value });
   };

   const { user } = useSelector((state) => state.auth);
   const {
      userContactSaveInfo,
      userContactSaveLoading,
      userContactSaveError,
      userContactInformation,
      userContactInformationFetchError,
   } = useSelector((state) => state.index);

   const SendHandler = function () {
      if (
         UserContact.name &&
         UserContact.phone &&
         UserContact.street &&
         UserContact.cityState &&
         UserContact.postalCode
      ) {
         if (!!user && user?.userObject && user?.userObject?.token) {
            const updateObject = { ...UserContact };
            updateObject.token = user?.userObject?.token;

            dispatch(saveUserContactInfo(updateObject));
            setError('');
         }
      } else {
         setError('All fileds is required!');
      }
   };

   useEffect(() => {
      if (user && user?.userObject && user?.userObject?.token) {
         dispatch(getUserContactInfo({ token: user?.userObject?.token }));
      }
   }, [!!user]);

   useEffect(() => {
      console.log('render effect');
      if (!!userContactInformation && userContactInformation.success) {
         setUserContact(userContactInformation.info);
      }
   }, [!!userContactInformation]);

   useEffect(() => {
      return () => {
         dispatch(removeContactUpdateInformation(null));
      };
   }, []);

   return (
      <styled.div className="sidePaddingOne">
         <h1>Contact information</h1>
         <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis rerum
            assumenda adipisci totam vel consequatur corrupti veritatis cumque distinctio.
         </p>
         <div className="mt-4">
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
                  label="Name"
                  name="name"
                  value={UserContact.name}
                  onChange={ChangeHandler}
                  required
                  type={'text'}
                  variant="outlined"
               />
               <TextField
                  id="outlined-basic"
                  label="Phone"
                  name="phone"
                  value={UserContact.phone}
                  onChange={ChangeHandler}
                  required
                  type={'number'}
                  variant="outlined"
               />
               <div>
                  <FormGroup>
                     <FormControlLabel
                        className="fixWidth"
                        control={
                           <Checkbox
                              checked={UserContact.showNumber}
                              name="showNumber"
                              onChange={(event) =>
                                 setUserContact({
                                    ...UserContact,
                                    showNumber: event.target.checked,
                                 })
                              }
                           />
                        }
                        label="Only i can see my phone number"
                     />
                     <p className=" text-gray-600 mt-1">
                        By submitting the form with this box checked, you confirm that you are the
                        primary user and subscriber to the telephone number provided, and you agree
                        to receive calls (including using artificial or pre-recorded voice), texts,
                        and WhatsApp messages from Indeed and employers who use Indeed at the
                        telephone number provided above.
                     </p>
                  </FormGroup>
               </div>
               <div className="mt-4">
                  <h5>Email</h5>
                  <div className="flex items-center justify-between">
                     <p className="mt-2 text-gray-500">
                        {!!user && user?.userObject ? user.userObject.email : null}
                     </p>
                     <p className=" cursor-pointer flex items-center">
                        Edit <HiOutlineArrowNarrowRight className="ms-2" />
                     </p>
                  </div>
               </div>
               <div className="mt-4">
                  <h5>Street address</h5>
                  <p className="mt-2 text-gray-500">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, blanditiis.
                  </p>
               </div>
               <TextField
                  id="outlined-basic"
                  label="Street"
                  name="street"
                  value={UserContact.street}
                  onChange={ChangeHandler}
                  required
                  type={'text'}
                  variant="outlined"
               />
               <TextField
                  id="outlined-basic"
                  label="City, State"
                  name="cityState"
                  value={UserContact.cityState}
                  onChange={ChangeHandler}
                  required
                  type={'text'}
                  variant="outlined"
               />
               <TextField
                  id="outlined-basic"
                  label="Postal code"
                  name="postalCode"
                  value={UserContact.postalCode}
                  onChange={ChangeHandler}
                  required
                  type={'number'}
                  variant="outlined"
               />
               {/*  <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={''}
                  onChange={ChangeHandler}
               >
                  {currencies.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </TextField> */}
            </Box>
            <CustomButtonComponent
               onClick={SendHandler}
               isLaoding={userContactSaveLoading}
               type={'submit'}
               innerText={'Save'}
               btnCl={'category_upload'}
            />
            {!!Error ? <p className=" text-red-500 mt-2">{Error}</p> : null}
            {!!userContactSaveError ? (
               <p className=" text-red-500 mt-2">{userContactSaveError}</p>
            ) : null}
            {!!userContactSaveInfo && userContactSaveInfo.success ? (
               <p className="mt-2">{userContactSaveInfo.message}</p>
            ) : null}
         </div>
      </styled.div>
   );
}

export default React.memo(ContactInfoComponent);
