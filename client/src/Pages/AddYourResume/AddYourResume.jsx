import React, { useState, useEffect } from 'react';
import * as styled from './AddYourResume.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { YearData, MonthData, DateData, Career, Experience } from './ExtraData';
import { GrAdd } from '@react-icons/all-files/gr/GrAdd';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { AiFillDelete } from '@react-icons/all-files/ai/AiFillDelete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
   saveUserResumeInformation,
   fetchUserResumeInformation,
} from '../../App/Features/index/indexSlice';
import { useCookies } from 'react-cookie';

function AddYourResume() {
   const [UserResumeInfo, setUserResumeInfo] = useState({
      headline: '',
      objective: '',
      year: '',
      month: '',
      date: '',
      eligibility: '',
      industry: '',
      experience: '',
      careerLevel: '',
      skills: [],
      resume: '',
   });
   const [ShowSkillOption, setShowSkillOption] = useState(false);
   const [SkillInfo, setSkillInfo] = useState({
      skill: '',
      yearOfExperience: '',
   });
   const [cookie] = useCookies(['user']);
   const [Error, setError] = useState('');

   const { user } = useSelector((state) => state.auth);
   const {
      saveUserResumeLoading,
      saveUserResumeResponse,
      saveUserResumeError,
      userResumeDetails,
      userResumeDetailsFetchLoading,
      userResumeDetailsFetchError,
   } = useSelector((state) => state.index);
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const ChangeHandler = function (event, eventTarget = undefined) {
      const { name, value } = event.target;
      if (eventTarget === 'skillHandler') {
         setSkillInfo({ ...SkillInfo, [name]: value });
      } else {
         setUserResumeInfo({ ...UserResumeInfo, [name]: value });
      }
   };

   const ShowSkillOptionHandler = function () {
      setShowSkillOption(!ShowSkillOption);
      setSkillInfo({ skill: '', yearOfExperience: '', id: '' });
   };

   const ResumeHandler = function (event) {
      const file = event.target.files[0];
      setUserResumeInfo({ ...UserResumeInfo, resume: file });
   };

   const AddSkillHandler = function () {
      const findSkillIsExists = UserResumeInfo.skills.find((el) =>
         !!SkillInfo?._id ? el._id === SkillInfo._id : SkillInfo.id === el.id
      );

      if (findSkillIsExists) {
         setUserResumeInfo({
            ...UserResumeInfo,
            skills: UserResumeInfo.skills.map((el) => (el._id === SkillInfo._id ? SkillInfo : el)),
         });
         setSkillInfo({ skill: '', yearOfExperience: '', id: '' });
         setShowSkillOption(false);
      } else {
         const isExists = UserResumeInfo.skills.find(
            (el) =>
               el.skill.toLowerCase().replaceAll(' ', '') ===
               SkillInfo.skill.toLowerCase().replaceAll(' ', '')
         );

         if (isExists) {
            setError('skill is already exists');
         } else {
            setError('');
            const id = new Date().getTime().toString(36) + Math.random().toString(16).slice(2);
            SkillInfo.id = id;
            setUserResumeInfo({
               ...UserResumeInfo,
               skills: UserResumeInfo.skills.concat(SkillInfo),
            });
            setSkillInfo({ skill: '', yearOfExperience: '', id: '' });
            setShowSkillOption(false);
         }
      }
   };

   const DeleteSkillHandler = function (id, searchElem) {
      const skills = UserResumeInfo.skills.filter((el) => el[searchElem] !== id);
      setUserResumeInfo({ ...UserResumeInfo, skills });
   };

   const EditSkillHandler = function (id, searchElem) {
      const skillObj = UserResumeInfo.skills.find((el) => el[searchElem] === id);
      setSkillInfo(skillObj);
      setShowSkillOption(true);
   };

   const SaveHandler = function (event) {
      if (!!user && user?.userObject && user?.userObject?.token) {
         event.preventDefault();
         const formData = new FormData();
         formData.append('headline', UserResumeInfo.headline);
         formData.append('objective', !!UserResumeInfo.objective ? UserResumeInfo.objective : '');
         formData.append('year', UserResumeInfo.year);
         formData.append('month', UserResumeInfo.month);
         formData.append('date', UserResumeInfo.date);
         formData.append('eligibility', UserResumeInfo.eligibility);
         formData.append('industry', UserResumeInfo.industry);
         formData.append('experience', UserResumeInfo.experience);
         formData.append('careerLevel', UserResumeInfo.careerLevel);
         formData.append('skills[]', JSON.stringify(UserResumeInfo.skills));
         formData.append('token', user?.userObject?.token);
         formData.append('resume', UserResumeInfo.resume);
         dispatch(saveUserResumeInformation({ formData, token: user?.userObject?.token }));
      } else {
         navigation('/portal/signin');
      }
   };

   useEffect(() => {
      if (!!cookie && cookie?.user && cookie?.user?.token) {
         dispatch(fetchUserResumeInformation(cookie?.user?.token));
      }
   }, []);

   useEffect(() => {
      if (!!userResumeDetails && userResumeDetails.success) {
         // setUserResumeInfo(userResumeDetails.info);
         setUserResumeInfo({
            headline: userResumeDetails.info?.headline || '',
            objective: userResumeDetails.info?.objective || '',
            year: userResumeDetails.info?.year || '',
            month: userResumeDetails.info?.month || '',
            date: userResumeDetails.info?.date || '',
            eligibility: userResumeDetails.info?.eligibility || '',
            industry: userResumeDetails.info?.industry || '',
            experience: userResumeDetails.info?.experience || '',
            careerLevel: userResumeDetails.info?.careerLevel || '',
            skills: userResumeDetails.info?.skills || [],
            resume: userResumeDetails.info?.resume || '',
         });
      }
   }, [!!userResumeDetails]);

   return (
      <styled.div className="sidePaddingOne">
         <h1>Personal Information</h1>
         <div className="py-4">
            <form onSubmit={SaveHandler}>
               <Box
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <TextField
                     label="Headline"
                     onChange={(event) => ChangeHandler(event)}
                     name="headline"
                     value={UserResumeInfo.headline}
                     variant="outlined"
                     type={'text'}
                  />
                  <TextField
                     onChange={(event) => ChangeHandler(event)}
                     label="Objective"
                     name="objective"
                     value={UserResumeInfo.objective}
                     multiline
                     rows={6}
                     type={'text'}
                  />
                  <hr />
                  <p className="mt-3">Personal Details</p>
                  <div className="lg-d-flex items-center md-d-block">
                     <div className="mt-2 w-100 w-lg-25">
                        <TextField
                           id="outlined-select-currency"
                           select
                           label="Year"
                           required
                           name="year"
                           value={UserResumeInfo.year}
                           onChange={(event) => ChangeHandler(event)}
                           helperText="Please select year"
                           className="w-100"
                        >
                           {YearData.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.value}
                              </MenuItem>
                           ))}
                        </TextField>
                     </div>
                     <div className="mt-2 w-100 w-lg-50 ps-0 ps-ld-2">
                        <TextField
                           id="outlined-select-currency"
                           select
                           label="Month"
                           name="month"
                           required
                           value={UserResumeInfo.month}
                           onChange={(event) => ChangeHandler(event)}
                           helperText="Please select month"
                           className="w-100"
                        >
                           {MonthData.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.value}
                              </MenuItem>
                           ))}
                        </TextField>
                     </div>
                     <div className="mt-2 w-100 w-lg-25 ps-0 ps-ld-2">
                        <TextField
                           id="outlined-select-currency"
                           select
                           label="Date"
                           required
                           name="date"
                           value={UserResumeInfo.date}
                           onChange={(event) => ChangeHandler(event)}
                           helperText="Please select date"
                           className="w-100"
                        >
                           {DateData.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.value}
                              </MenuItem>
                           ))}
                        </TextField>
                     </div>
                  </div>
                  <TextField
                     label="Employment Eligibility"
                     onChange={(event) => ChangeHandler(event)}
                     name="eligibility"
                     required
                     value={UserResumeInfo.eligibility}
                     variant="outlined"
                     type={'text'}
                  />
                  <TextField
                     id="outlined-select-currency"
                     select
                     label="Highest Career Level"
                     name="careerLevel"
                     required
                     value={UserResumeInfo.careerLevel}
                     onChange={(event) => ChangeHandler(event)}
                     className="w-100"
                  >
                     {Career.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.value}
                        </MenuItem>
                     ))}
                  </TextField>
                  <TextField
                     label="Industry"
                     onChange={(event) => ChangeHandler(event)}
                     name="industry"
                     required
                     value={UserResumeInfo.industry}
                     variant="outlined"
                     type={'text'}
                  />
                  <TextField
                     label="Total years of experience"
                     onChange={(event) => ChangeHandler(event)}
                     name="experience"
                     required
                     value={UserResumeInfo.experience}
                     variant="outlined"
                     type={'number'}
                  />
                  <div className="py-3 px-3 updateResume flex items-center">
                     <div>
                        <img src="/images/file2.svg" alt="" />
                     </div>
                     <div className="ms-3">
                        <p>
                           {!!UserResumeInfo?.resume
                              ? UserResumeInfo?.resume?.name || UserResumeInfo?.resume
                              : 'Add your resume'}
                        </p>
                     </div>
                     <input type="file" onChange={ResumeHandler} />
                  </div>
                  <hr />
                  <div className=" mt-3 flex items-center justify-between">
                     <p>Skill - required</p>
                     {ShowSkillOption ? null : (
                        <GrAdd className=" cursor-pointer" onClick={ShowSkillOptionHandler} />
                     )}
                  </div>
                  <span className=" text-gray-500">
                     e.g. Microsoft Office, Java, Tally, Python etc.
                  </span>
                  {!!ShowSkillOption ? (
                     <div className="mt-3 w-100">
                        <TextField
                           label="Skill"
                           onChange={(event) => ChangeHandler(event, 'skillHandler')}
                           name="skill"
                           value={SkillInfo.skill}
                           variant="outlined"
                           type={'text'}
                           className="w-100"
                        />
                        <TextField
                           id="outlined-select-currency"
                           select
                           label="Year of experience"
                           name="yearOfExperience"
                           value={SkillInfo.yearOfExperience}
                           onChange={(event) => ChangeHandler(event, 'skillHandler')}
                           className="w-100 mt-3"
                        >
                           {Experience.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.value}
                              </MenuItem>
                           ))}
                        </TextField>
                        <div className=" flex items-center">
                           <CustomButtonComponent
                              onClick={AddSkillHandler}
                              innerText={'Save'}
                              btnCl={'category_upload'}
                           />
                           <CustomButtonComponent
                              onClick={ShowSkillOptionHandler}
                              innerText={'Clear'}
                              btnCl={'Delete_btn ms-2'}
                           />
                        </div>
                     </div>
                  ) : null}
                  {!!UserResumeInfo?.skills && UserResumeInfo?.skills.length
                     ? UserResumeInfo.skills.map((el) => (
                          <div
                             className="flex items-center mt-3 justify-between"
                             key={!!el?._id ? el._id : el.id}
                          >
                             <div>
                                <p className=" text-gray-800">
                                   {el.skill} -{' '}
                                   <span className=" text-gray-600">{el.yearOfExperience}</span>
                                </p>
                             </div>
                             <div className="flex items-center">
                                <FiEdit2
                                   className="me-3 cursor-pointer"
                                   onClick={() =>
                                      EditSkillHandler(
                                         !!el?._id ? el._id : el.id,
                                         !!el?._id ? '_id' : 'id'
                                      )
                                   }
                                />
                                <AiFillDelete
                                   className=" cursor-pointer"
                                   onClick={() =>
                                      DeleteSkillHandler(
                                         !!el?._id ? el._id : el.id,
                                         !!el?._id ? '_id' : 'id'
                                      )
                                   }
                                />
                             </div>
                          </div>
                       ))
                     : null}

                  <CustomButtonComponent
                     innerText={'Save Inforamtion'}
                     btnCl={'category_upload'}
                     type="submit"
                     isLaoding={saveUserResumeLoading}
                  />
                  {!!Error ? <p className=" text-red-400">{Error}</p> : null}
                  {!!saveUserResumeError || userResumeDetailsFetchError ? (
                     <p className=" text-red-500">
                        {!!saveUserResumeError ? saveUserResumeError : userResumeDetailsFetchError}
                     </p>
                  ) : null}
                  {!!saveUserResumeResponse ? <p>{saveUserResumeResponse.message}</p> : null}
               </Box>
            </form>
         </div>
      </styled.div>
   );
}

export default AddYourResume;
