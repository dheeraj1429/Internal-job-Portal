import React, { useState, useRef, useEffect } from 'react';
import * as styled from './PostJobComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import JoditEditor from 'jodit-react';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router';
import { message } from 'antd';
import {
   postNewJob,
   removeJobPostInfo,
   getSingleJobPostDetails,
   removeSingleJobPostInfo,
   updateJobPost,
} from '../../App/Features/Admin/adminSlice';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import { useParams } from 'react-router';
import { Cookies, useCookies } from 'react-cookie';

const jobTypeObAr = [{ value: 'Full-Time' }, { value: 'Part-Time' }];
const jobCategoryObAr = [{ value: 'Exempt' }, { value: 'Non-Exempt' }];

function PostJobComponent() {
   const [JobDetails, setJobDetails] = useState({
      jobTitle: '',
      salaryRangeStart: '',
      salaryRangeEnd: '',
      jobType: '',
      jobCategory: '',
      positionDescription: '',
   });
   const editor = useRef(null);
   const [content, setContent] = useState('');
   const [Coookie] = useCookies(['user']);

   const navigation = useNavigate();
   const dispatch = useDispatch();
   const params = useParams();

   const {
      insertNewJobPostLoading,
      insertNewJobPostError,
      insertNewJobPost,
      singleJobPost,
      singleJobPostFetchError,
   } = useSelector((state) => state.admin);
   const { user } = useSelector((state) => state.auth);

   const ChangeHandler = function (event) {
      const { name, value } = event.target;
      setJobDetails({ ...JobDetails, [name]: value });
   };

   const sendHandler = function (event) {
      event.preventDefault();

      if (user && user?.userObject && user?.userObject?.token) {
         if (
            JobDetails.jobTitle &&
            JobDetails.salaryRangeStart &&
            JobDetails.salaryRangeEnd &&
            JobDetails.jobType
         ) {
            if (Number(JobDetails.salaryRangeStart) > Number(JobDetails.salaryRangeEnd)) {
               return message.info('Start salary is grater then end salary');
            }

            if (params?.id) {
               dispatch(
                  updateJobPost(
                     Object.assign(JobDetails, {
                        token: user?.userObject?.token,
                        metaData: content,
                        postId: singleJobPost.post._id,
                     })
                  )
               );
            } else {
               dispatch(
                  postNewJob(
                     Object.assign(JobDetails, {
                        token: user?.userObject?.token,
                        metaData: content,
                     })
                  )
               );
            }
         } else {
            message.info('Please fill the required fileds!');
         }
      } else {
         navigation('/portal/signin');
      }
   };

   useEffect(() => {
      if (!!insertNewJobPost && insertNewJobPost.success) {
         message.success(insertNewJobPost.message);
      }
   }, [insertNewJobPost]);

   useEffect(() => {
      return () => {
         dispatch(removeJobPostInfo());
         dispatch(removeSingleJobPostInfo());
      };
   }, []);

   useEffect(() => {
      if (
         params &&
         !!params?.id &&
         !!user &&
         user?.userObject &&
         !!Coookie &&
         Coookie?.user &&
         Coookie?.user?.token
      ) {
         dispatch(getSingleJobPostDetails({ token: Coookie?.user?.token, jobId: params.id }));
      }
   }, [params]);

   useEffect(() => {
      if (!!singleJobPost && singleJobPost.success && singleJobPost?.post) {
         setJobDetails({
            jobTitle: singleJobPost.post.jobTitle,
            salaryRangeStart: singleJobPost.post.salaryRangeStart,
            salaryRangeEnd: singleJobPost.post.salaryRangeEnd,
            jobType: singleJobPost.post.jobType,
            jobCategory: singleJobPost.post.jobCategory,
            positionDescription: singleJobPost.post.positionDescription,
         });
         setContent(singleJobPost.post.metaData);
      }
   }, [singleJobPost]);

   if (!user) {
      return <Navigate to={'/portal/signin'} />;
   }

   return (
      <styled.div>
         <HeadingComponent
            heading={params?.id ? 'Update job post' : 'Post new job'}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
         />
         <div className="mt-5">
            <Box
               component="form"
               sx={{
                  '& > :not(style)': { my: 3, width: '100%' },
               }}
               noValidate
               autoComplete="off"
            >
               <div className="w-100">
                  <TextField
                     id="outlined-basic"
                     required
                     onChange={ChangeHandler}
                     value={JobDetails.jobTitle}
                     type="text"
                     name="jobTitle"
                     className="w-100"
                     label="Job title"
                     variant="outlined"
                  />
               </div>
               <div className="flex items-center">
                  <div className="w-100 pe-2">
                     <TextField
                        required
                        id="outlined-basic"
                        onChange={ChangeHandler}
                        value={JobDetails.salaryRangeStart}
                        type="number"
                        name="salaryRangeStart"
                        label="Salary range start"
                        className="w-100"
                        variant="outlined"
                     />
                  </div>
                  <div className="w-100 pe-2">
                     <TextField
                        required
                        id="outlined-basic"
                        onChange={ChangeHandler}
                        value={JobDetails.salaryRangeEnd}
                        type="number"
                        name="salaryRangeEnd"
                        label="Salary range end"
                        className="w-100"
                        variant="outlined"
                     />
                  </div>
                  <div className="w-100 pe-2">
                     <TextField
                        id="outlined-select-currency"
                        required
                        onChange={ChangeHandler}
                        value={JobDetails.jobType}
                        className="w-100"
                        select
                        label="Job type"
                        name="jobType"
                     >
                        {jobTypeObAr.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.value}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
                  <div className="w-100">
                     <TextField
                        id="outlined-select-currency"
                        onChange={ChangeHandler}
                        value={JobDetails.jobCategory}
                        className="w-100"
                        select
                        name="jobCategory"
                        label="Category"
                     >
                        {jobCategoryObAr.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.value}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
               </div>
               <div className="w-100">
                  <TextField
                     id="outlined-multiline-static"
                     onChange={ChangeHandler}
                     className="w-100"
                     value={JobDetails.positionDescription}
                     name="positionDescription"
                     label="Position description"
                     multiline
                     rows={4}
                  />
               </div>
               <div className="w-100">
                  <label className="mb-1">Job description</label>
                  <div className="mb-3">
                     <span className=" text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aliquam
                        accusamus, excepturi rerum hic assumenda saepe earum animi quasi ipsam,
                        aspernatur porro nobis, odio illum iste ex veniam aut ratione!
                     </span>
                  </div>
                  <JoditEditor
                     ref={editor}
                     value={content}
                     onChange={(newContent) => setContent(newContent)}
                  />
               </div>
               <CustomButtonComponent
                  onClick={sendHandler}
                  type="submit"
                  isLaoding={insertNewJobPostLoading}
                  innerText={params?.id ? 'Update' : 'Post'}
                  btnCl={'category_upload'}
               />
               {!!insertNewJobPostError ? (
                  <p className=" text-red-400">{insertNewJobPostError}</p>
               ) : null}
               {!!singleJobPostFetchError ? (
                  <p className=" text-red-400">{singleJobPostFetchError}</p>
               ) : null}
            </Box>
         </div>
      </styled.div>
   );
}

export default PostJobComponent;
