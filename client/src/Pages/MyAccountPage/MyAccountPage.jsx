import React, { useEffect } from 'react';
import * as styled from './MyAccountPage.style';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserContactInfo } from '../../App/Features/index/indexSlice';
import { AiOutlineMail } from '@react-icons/all-files/ai/AiOutlineMail';
import { MdCallReceived } from '@react-icons/all-files/md/MdCallReceived';
import { TiLocationOutline } from '@react-icons/all-files/ti/TiLocationOutline';
import { useNavigate } from 'react-router-dom';
import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye';
import { useCookies } from 'react-cookie';

function MyAccountPage() {
   const { user } = useSelector((state) => state.auth);
   const { userContactInformation } = useSelector((state) => state.index);
   const [cookie] = useCookies(['user']);

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const Handler = function () {
      navigation('/contact');
   };

   useEffect(() => {
      if (!!cookie && cookie?.user && cookie?.user?.token) {
         dispatch(getUserContactInfo({ token: cookie?.user?.token }));
      }
   }, []);

   return (
      <styled.div className="sidePaddingOne">
         {!!user && user?.userObject ? (
            <div>
               {userContactInformation?.info ? (
                  <>
                     <h1 className="banerHeading">{userContactInformation?.info?.name}</h1>
                     <p className="mt-3">
                        {!!userContactInformation?.info?.bio
                           ? userContactInformation?.info?.bio
                           : 'Add your bio'}
                     </p>
                  </>
               ) : null}

               {userContactInformation?.info?.email &&
               userContactInformation?.info?.phone &&
               userContactInformation?.info?.cityState ? (
                  <div
                     className="userInfomationShowDiv shadow px-5 py-3 mt-4 cursor-pointer"
                     onClick={Handler}
                  >
                     <div className="flex items-center">
                        <AiOutlineMail className="me-3" />
                        <p className=" text-gray-500">{userContactInformation.info.email}</p>
                     </div>
                     <div className="flex items-center my-2">
                        <MdCallReceived className="me-3" />
                        <p className=" text-gray-500">{userContactInformation.info.phone}</p>
                     </div>
                     <div className="flex items-center">
                        <TiLocationOutline className="me-3" />
                        <p className=" text-gray-500">{userContactInformation.info.cityState}</p>
                     </div>
                  </div>
               ) : (
                  <div className="contact_info">
                     <Link to={'/contact'}>
                        <p className=" text-sky-800 mt-3">Add your contact information</p>
                     </Link>
                  </div>
               )}
            </div>
         ) : null}
         <div className="mt-5">
            <h5>Resumes</h5>
            <div
               className="userInfomationShowDiv shadow px-5 py-4 mt-4 cursor-pointer flex items-center"
               onClick={() => navigation('/resume')}
            >
               <div className="me-4">
                  <img src="/images/file.svg" alt="" />
               </div>
               <div>
                  <p>Resume</p>
                  <div>
                     <span className=" text-gray-700">Updated Aug 10, 2022</span>
                  </div>
                  <span className=" text-gray-700 flex items-center">
                     <AiFillEye className="me-2" /> Public
                  </span>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default MyAccountPage;
