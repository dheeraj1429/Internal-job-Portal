import React, { useState, useEffect, useRef } from 'react';
import * as styled from './ContactInfoComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserContactInfo, getUserContactInfo } from '../../App/Features/index/indexSlice';
import { HiOutlineArrowNarrowRight } from '@react-icons/all-files/hi/HiOutlineArrowNarrowRight';
import SpennerComponent from '../../HelperComponents/SpennerComponent/SpennerComponent';
import { useCookies } from 'react-cookie';

function ContactInfoComponent() {
   const [UserContact, setUserContact] = useState({
      name: '',
      phone: '',
      bio: '',
      street: '',
      cityState: '',
      postalCode: '',
      showNumber: false,
      profile: '',
   });
   const [Error, setError] = useState('');
   const [ImagePrev, setImagePrev] = useState('');
   const image = useRef(null);
   const [cookie] = useCookies(['user']);
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
      userContactInformationFetchLoading,
   } = useSelector((state) => state.index);

   const ValidateImage = function (value) {
      const allowedFiles = ['.jpg', '.png', '.jpeg'];
      const regex = new RegExp('([a-zA-Z0-9s_\\.-:])+(' + allowedFiles.join('|') + ')$');
      if (!regex.test(value)) return false;
      else return true;
   };

   const ImageUploadHander = function (event) {
      const file = event.target.files[0];

      const checkImage = ValidateImage(image.current.value);
      if (checkImage) {
         setUserContact({ ...UserContact, profile: file });
         if (file) {
            setError('');
            const src = URL.createObjectURL(file);
            setImagePrev(src);
         }
      } else {
         setError(`Please upload files having extensions: jpg, png, jpeg only.`);
      }
   };

   const SendHandler = function (event) {
      event.preventDefault();
      const { name, phone, street, cityState, postalCode, bio, showNumber } = UserContact;
      const formData = new FormData();

      if (!name && !phone && !street && !cityState && !postalCode)
         return setError('All fileds is required!');

      if (String(phone).length !== 10) return setError('Enter 10 digit phone number');

      if (!Error && !!user && user?.userObject && user?.userObject?.token) {
         formData.append('name', name);
         formData.append('phone', phone);
         formData.append('street', street);
         formData.append('cityState', cityState);
         formData.append('postalCode', postalCode);
         formData.append('profile', UserContact.profile);
         formData.append('bio', bio);
         formData.append('showNumber', showNumber);
         formData.append('token', user?.userObject?.token);

         dispatch(saveUserContactInfo({ formData: formData, token: user?.userObject?.token }));
         setError('');
      }
   };

   useEffect(() => {
      if (!!cookie && cookie?.user && cookie?.user?.token) {
         dispatch(getUserContactInfo({ token: cookie?.user?.token }));
      }
   }, []);

   useEffect(() => {
      if (!!userContactInformation && userContactInformation.success) {
         setUserContact({
            name: userContactInformation?.info?.name || '',
            phone: userContactInformation?.info?.phone || '',
            bio: userContactInformation?.info?.bio || '',
            street: userContactInformation?.info?.street || '',
            cityState: userContactInformation?.info?.cityState || '',
            postalCode: userContactInformation?.info?.postalCode || '',
            showNumber: userContactInformation?.info?.showNumber || false,
            profile: userContactInformation?.info?.profile || '',
         });
      }
   }, [!!userContactInformation]);

   return (
      <styled.div className="sidePaddingOne">
         <h1>Contact information</h1>
         <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis rerum
            assumenda adipisci totam vel consequatur corrupti veritatis cumque distinctio.
         </p>
         {!!userContactInformationFetchLoading ? (
            <div className="flex items-center justify-center py-4">
               <SpennerComponent />
            </div>
         ) : (
            <div className="mt-4">
               <p className=" mb-2 text-gray-500">Change your profile image</p>
               <div className="imageUpdateDiv mb-4 shadow-sm">
                  <img
                     src={
                        !!ImagePrev
                           ? ImagePrev
                           : `/usersProfileCompress/${userContactInformation?.info?.userProfile}`
                     }
                     alt=""
                  />
                  <input type="file" ref={image} onChange={ImageUploadHander} />
               </div>
               <form onSubmit={SendHandler}>
                  <Box
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
                        onInput={(e) => {
                           e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 10);
                        }}
                     />
                     <TextField
                        label="Bio"
                        name="bio"
                        multiline
                        rows={4}
                        onChange={ChangeHandler}
                        value={UserContact.bio}
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
                              By submitting the form with this box checked, you confirm that you are
                              the primary user and subscriber to the telephone number provided, and
                              you agree to receive calls (including using artificial or pre-recorded
                              voice), texts, and WhatsApp messages from Indeed and employers who use
                              Indeed at the telephone number provided above.
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
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                           blanditiis.
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
                        onInput={(e) => {
                           e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 10);
                        }}
                     />
                  </Box>
                  <CustomButtonComponent
                     isLaoding={userContactSaveLoading}
                     type={'submit'}
                     innerText={'Save'}
                     btnCl={'category_upload'}
                  />
               </form>

               {!!Error ? <p className=" text-red-500 mt-2">{Error}</p> : null}
               {!!userContactSaveError ? (
                  <p className=" text-red-500 mt-2">{userContactSaveError}</p>
               ) : null}
               {!!userContactSaveInfo && userContactSaveInfo.success ? (
                  <p className="mt-2">{userContactSaveInfo.message}</p>
               ) : null}
            </div>
         )}
      </styled.div>
   );
}

export default React.memo(ContactInfoComponent);
