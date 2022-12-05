import React from 'react';
import { BiDotsHorizontalRounded } from '@react-icons/all-files/bi/BiDotsHorizontalRounded';
import { BiRupee } from '@react-icons/all-files/bi/BiRupee';
import { BsBag } from '@react-icons/all-files/bs/BsBag';
import { BiTime } from '@react-icons/all-files/bi/BiTime';
import { HiOutlineUsers } from '@react-icons/all-files/hi/HiOutlineUsers';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { deleteSingleJobPost } from '../../App/Features/Admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomButtonComponent from '../../HelperComponents/CustomButtonComponent/CustomButtonComponent';
import { Link } from 'react-router-dom';

function JobCartComponent({ data }) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const navigation = useNavigate();
   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const EditHandler = function (jobId) {
      setAnchorEl(null);
      navigation(`/job/edit/${jobId}`);
   };

   const DelteHander = function (jobId) {
      if (!!user && user?.userObject && user?.userObject?.token) {
         setAnchorEl(null);
         dispatch(deleteSingleJobPost({ token: user?.userObject?.token, postId: jobId }));
      }
   };

   const checkDays = function () {
      return Math.abs(
         Math.ceil(new Date(data.createdAt) - new Date()) / (1000 * 60 * 60 * 24)
      ).toFixed();
   };

   let days = checkDays();

   return (
      <div className="jobPostCart shadow  rounded-lg">
         <div className="flex items-center justify-between px-4 py-3 border-bottom">
            <div>
               <h5>{data.jobTitle}</h5>
               {/* <p className=" text-gray-500">San Farancicos</p> */}
            </div>
            <div>
               {!!user && user?.userObject && user?.userObject?.role === 'admin' ? (
                  <div className="flex justify-end w-full">
                     <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                     >
                        <BiDotsHorizontalRounded />
                     </Button>
                     <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                           'aria-labelledby': 'basic-button',
                        }}
                     >
                        <MenuItem onClick={() => EditHandler(data._id)}>Edit job post</MenuItem>
                        <MenuItem onClick={() => DelteHander(data._id)}>Delete job post</MenuItem>
                     </Menu>
                  </div>
               ) : null}
               <span className=" text-gray-400">
                  Posted {days === '0' ? 'Today' : `${days} days ago`}
               </span>
            </div>
         </div>
         <div className="mt-2 pt-2 pb-3 px-4">
            <div className="flex items-center">
               <BiRupee />
               <p className="ms-2text-gray-700">
                  {data.salaryRangeStart} - {data.salaryRangeEnd}
               </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
               <div className="flex items-center">
                  <BsBag className="svgBlue" />
                  <p className="ms-2 text-gray-800">{data.jobCategory}</p>
               </div>
               <div className="flex items-center">
                  <BiTime className="svgBlue" />
                  <p className="ms-2 text-gray-800">{data.jobType}</p>
               </div>
               <div className="flex items-center">
                  <HiOutlineUsers className="svgBlue" />
                  <p className="ms-2 text-gray-800">{data.userApplied.length} Applications</p>
               </div>
            </div>
            <p className="mt-4">
               <strong>Position Details</strong>
            </p>
            <p className="mt-2 text-gray-600">{data.positionDescription.slice(0, 200)}</p>

            <Link
               to={`/job/single/${data.jobTitle.toLowerCase().replaceAll(' ', '-')}/${data._id}`}
            >
               <CustomButtonComponent innerText={'View'} btnCl={'category_upload w-100'} />
            </Link>
         </div>
      </div>
   );
}

export default JobCartComponent;
