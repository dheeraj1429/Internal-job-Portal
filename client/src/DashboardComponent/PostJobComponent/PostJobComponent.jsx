import React, { useState, useRef } from 'react';
import * as styled from './PostJobComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import JoditEditor from 'jodit-react';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import { postNewJob } from '../../App/Features/Admin/adminSlice';

const jobType = [{ value: 'Full-Time' }, { value: 'Part-Time' }];
const jobCategory = [{ value: 'Exempt' }, { value: 'Non-Exempt' }];

function PostJobComponent() {
   const [JobDetails, setJobDetails] = useState({
      jobTitle: '',
      salaryRange: '',
      jobType: '',
      jobCategory: '',
      positionDescription: '',
   });
   const editor = useRef(null);
   const [content, setContent] = useState('');
   const navigation = useNavigate();
   const dispatch = useDispatch();

   const { insertNewJobPostLoading, insertNewJobPostError } = useSelector((state) => state.admin);
   const { user } = useSelector((state) => state.auth);

   const ChangeHandler = function (event) {
      const { name, value } = event.target;
      setJobDetails({ ...JobDetails, [name]: value });
   };

   const sendHandler = function (event) {
      event.preventDefault();

      if (user && user?.token) {
         if (JobDetails.jobTitle && JobDetails.salaryRange && JobDetails.jobType) {
            dispatch(postNewJob(Object.assign(JobDetails, { token: user?.token })));
         } else {
            message.info('Please fill the required fileds!');
         }
      } else {
         navigation('/portal/signin');
      }
   };

   return (
      <styled.div>
         <h1>Post new Job</h1>
         <p className=" text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quam laudantium maiores sed illum provident nulla sapiente repellat assumenda, quisquam ut, iusto consectetur error
            esse eveniet tempora hic quod repudiandae?
         </p>
         <div className="mt-5">
            <Box
               onSubmit={sendHandler}
               component="form"
               sx={{
                  '& > :not(style)': { my: 3, width: '100%' },
               }}
               noValidate
               autoComplete="off"
            >
               <div className="w-100">
                  <TextField id="outlined-basic" required onChange={ChangeHandler} value={JobDetails.jobTitle} type="text" name="jobTitle" className="w-100" label="Job title" variant="outlined" />
               </div>
               <div className="flex items-center">
                  <div className="w-100 pe-2">
                     <TextField
                        required
                        id="outlined-basic"
                        onChange={ChangeHandler}
                        value={JobDetails.salaryRange}
                        type="number"
                        name="salaryRange"
                        label="Salary range"
                        className="w-100"
                        variant="outlined"
                     />
                  </div>
                  <div className="w-100 pe-2">
                     <TextField id="outlined-select-currency" required onChange={ChangeHandler} vale={JobDetails.jobType} className="w-100" select label="Job type" name="jobType">
                        {jobType.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.value}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
                  <div className="w-100">
                     <TextField id="outlined-select-currency" onChange={ChangeHandler} value={JobDetails.jobCategory} className="w-100" select name="jobCategory" label="Category">
                        {jobCategory.map((option) => (
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aliquam accusamus, excepturi rerum hic assumenda saepe earum animi quasi ipsam, aspernatur porro nobis, odio illum
                        iste ex veniam aut ratione!
                     </span>
                  </div>
                  <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
               </div>
               <CustomButtonComponent type="submit" isLaoding={insertNewJobPostLoading} innerText={'Post'} btnCl={'category_upload'} />
            </Box>
         </div>
      </styled.div>
   );
}

export default PostJobComponent;
