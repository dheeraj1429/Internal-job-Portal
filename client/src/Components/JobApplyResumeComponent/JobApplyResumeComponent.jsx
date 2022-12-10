import React, { useEffect, useState } from 'react';
import * as styled from './JobApplyResumeComponent.style';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { fetchUserResumeContactInformation, removeJobSubmitionInformation, removeUserResumeDetails } from '../../App/Features/index/indexSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import SpennerComponent from '../../HelperComponents/SpennerComponent/SpennerComponent';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router';
import { jobSubmition } from '../../App/Features/index/indexSlice';
import PopupAlertComponent from '../../HelperComponents/PopupAlertComponent/PopupAlertComponent';

function JobApplyResumeComponent() {
   const [UserJobInfo, setUserJobInfo] = useState({
      reference: false,
      notes: '',
      candidateName: '',
      candidateNumber: '',
      referenceResume: '',
   });
   const [Error, setError] = useState('');
   const dispatch = useDispatch();
   const [cookie] = useCookies(['_ijp_at_user']);
   const naviation = useNavigate();
   const { singleJobPost, userResumeDetails, userResumeDetailsFetchLoading, userResumeDetailsFetchError, jobSubmitionResponse, jobSubmitionFetchLoading } = useSelector((state) => state.index);
   const { user } = useSelector((state) => state.auth);
   const params = useParams();

   const EditHandler = function () {
      naviation('/contact');
   };

   const ChangeHandler = function (event, target) {
      if (target === 'checkbox') {
         const check = event.target.checked;
         setUserJobInfo({ ...UserJobInfo, reference: check });
      } else {
         const { name, value } = event.target;
         setUserJobInfo({ ...UserJobInfo, [name]: value });
      }
   };

   const ResumeHandlerUploadHandler = function (event) {
      const file = event.target.files[0];
      setUserJobInfo({ ...UserJobInfo, referenceResume: file });
   };

   const ApplyHandler = function () {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         const jobId = params.id;

         if (!userResumeDetails.info?.street) {
            return naviation('/contact');
         }

         if (!userResumeDetails?.info?.industry && !userResumeDetails?.info?.experience) {
            return naviation('/resume');
         }

         if (!UserJobInfo.reference) {
            const formData = new FormData();
            formData.append('token', cookie?._ijp_at_user?.token);
            formData.append('reference', UserJobInfo.reference);
            formData.append('notes', UserJobInfo.notes);
            formData.append('jobId', jobId);

            return dispatch(
               jobSubmition({
                  token: cookie?._ijp_at_user?.token,
                  formData: formData,
               })
            );
         }

         if (UserJobInfo.reference) {
            if (!!UserJobInfo?.referenceResume && !!UserJobInfo?.candidateName && !!UserJobInfo?.candidateNumber) {
               const formData = new FormData();
               formData.append('token', cookie?._ijp_at_user?.token);
               formData.append('reference', UserJobInfo.reference);
               formData.append('notes', UserJobInfo.notes);
               formData.append('candidateName', UserJobInfo.candidateName);
               formData.append('candidateNumber', UserJobInfo.candidateNumber);
               formData.append('referenceResume', UserJobInfo.referenceResume);
               formData.append('jobId', jobId);

               dispatch(
                  jobSubmition({
                     token: cookie?._ijp_at_user?.token,
                     formData: formData,
                  })
               );
            } else {
               setError('If you check the reference checkbox then you have to pass the reference candidate’s information.');
            }
         }
      } else {
         naviation('/portal/signin');
      }
   };

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         dispatch(fetchUserResumeContactInformation(cookie?._ijp_at_user?.token));
      }
      return () => {
         dispatch(removeUserResumeDetails(null));
         dispatch(removeJobSubmitionInformation(null));
      };
   }, []);

   return (
      <styled.div>
         <PopupAlertComponent show={jobSubmitionResponse} />
         <h1>Add a resume for the employer</h1>
         {!userResumeDetailsFetchLoading && !!userResumeDetails && userResumeDetails?.success && userResumeDetails?.info ? (
            <div className="mt-5">
               <div className="border p-3 selectDiv ">
                  <img src="/images/right.svg" alt="" className="rightPgn" />
                  <div className="flex items-center">
                     <div>
                        <img src="/images/i.svg" alt="" />
                     </div>
                     <div className="ms-2">
                        <div className="recommed mb-1">
                           <p>Recommended</p>
                        </div>
                        <h5>Web resume</h5>
                     </div>
                  </div>
                  <div className="mt-3 mb-4 border-top pt-3">
                     <h2>
                        <strong>{userResumeDetails.info.name}</strong>
                     </h2>
                     <p className="mt-1 text-gray-500">{userResumeDetails.info.email}</p>
                     <p className=" text-gray-500">{userResumeDetails.info.street}</p>
                  </div>
                  <CustomButtonComponent onClick={EditHandler} btnCl={'editButton w-100 mt-2'}>
                     <p>
                        Edit <FiEdit2 className="ms-2" />
                     </p>
                  </CustomButtonComponent>
               </div>

               {!!userResumeDetails?.info.resume ? (
                  <div className="userResume mt-3">
                     <div className="py-3 px-3 updateResume selectDiv border flex items-center">
                        <div>
                           <img src="/images/file2.svg" alt="" />
                        </div>
                        <div className="ms-3">
                           <p>{!!userResumeDetails?.info?.resume ? userResumeDetails?.info?.resume : 'Add your resume'}</p>
                        </div>
                     </div>
                  </div>
               ) : null}
               <h2 className="mt-4">Questions from the employer</h2>
               <p className=" text-gray-500 mt-3 selectDiv">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, laborum voluptatum aliquid consequatur unde eos cum, perferendis ipsum saepe mollitia asperiores. Nemo, eligendi
                  distinctio. Quisquam expedita odit distinctio cupiditate nulla.
               </p>
               <TextField id="outlined-multiline" className="mt-3 selectDiv" label="Notes" multiline onChange={(event) => ChangeHandler(event)} value={UserJobInfo.notes} name="notes" rows={4} />
               <div className="fit">
                  <FormGroup className="mt-2">
                     <FormControlLabel
                        control={<Checkbox checked={UserJobInfo.reference} name="reference" onChange={(event) => ChangeHandler(event, 'checkbox')} />}
                        label="Apply this job for your reference"
                     />
                  </FormGroup>
               </div>
               {!!UserJobInfo.reference ? (
                  <div className="mt-3 selectDiv">
                     <TextField
                        id="outlined-basic"
                        className="w-100"
                        label="Reference candidate’s name"
                        variant="outlined"
                        type={'text'}
                        name="candidateName"
                        value={UserJobInfo.candidateName}
                        onChange={(event) => ChangeHandler(event)}
                     />
                     <TextField
                        id="outlined-basic"
                        className="w-100 mt-3"
                        label="Reference candidate’s number"
                        variant="outlined"
                        type={'number'}
                        name="candidateNumber"
                        onChange={(event) => ChangeHandler(event)}
                        value={UserJobInfo.candidateNumber}
                        onInput={(e) => {
                           e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                        }}
                     />

                     <div className="py-3 px-3 border w-100 mt-3 selectDiv updateResume flex items-center">
                        <div>
                           <img src="/images/file2.svg" alt="" />
                        </div>
                        <div className="ms-3">
                           {!!UserJobInfo.referenceResume && UserJobInfo.referenceResume?.name ? <p>{UserJobInfo.referenceResume?.name}</p> : <p>Add your reference candidate’s resume</p>}
                        </div>
                        <input type="file" onChange={ResumeHandlerUploadHandler} />
                     </div>
                  </div>
               ) : null}

               <CustomButtonComponent
                  onClick={singleJobPost?.post?.userApplied.map((el) => el.user).includes(user?.userObject._id) ? null : () => ApplyHandler()}
                  innerText={singleJobPost?.post?.userApplied.map((el) => el.user).includes(user?.userObject._id) ? 'Applyed' : 'Apply'}
                  btnCl={'category_upload'}
                  isLaoding={jobSubmitionFetchLoading}
               />
            </div>
         ) : !!userResumeDetailsFetchLoading ? (
            <div className="border p-5 flex items-center justify-center rounded mt-4">
               <SpennerComponent />
            </div>
         ) : !!userResumeDetailsFetchError ? (
            <p className=" text-red-500">{userResumeDetailsFetchError}</p>
         ) : null}
         {!!Error ? <p className=" text-red-500 mt-2">{Error}</p> : null}
      </styled.div>
   );
}

export default JobApplyResumeComponent;
