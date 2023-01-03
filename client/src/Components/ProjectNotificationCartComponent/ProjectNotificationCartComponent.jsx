import React, { useState } from "react";
import * as styled from "./ProjectNotificationCartComponent.style";
import dayjs from "dayjs";
import { FcAdvance } from "@react-icons/all-files/fc/FcAdvance";
import { FcOvertime } from "@react-icons/all-files/fc/FcOvertime";
import { FcHighPriority } from "@react-icons/all-files/fc/FcHighPriority";
import { FcOnlineSupport } from "@react-icons/all-files/fc/FcOnlineSupport";
import { FcRatings } from "@react-icons/all-files/fc/FcRatings";
import { BiDotsHorizontalRounded } from "@react-icons/all-files/bi/BiDotsHorizontalRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../../Context/UserContext";
import { USER_ACTION_TYPE } from "../../Context/ActionType";

function ProjectNotificationCartComponent({ data, userInfo, createdAt }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const { dispatch } = UserContext();

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const PinHandler = function () {
      setAnchorEl(null);
      dispatch({ type: USER_ACTION_TYPE.SHOW_GROUP_POPUP, show: true });
      dispatch({ type: USER_ACTION_TYPE.STORE_SELECTED_PROJECT, payload: data });
   };

   return (
      <styled.div className="col-12 mb-3">
         <div className="pinned_projects_div p-3 shadow w-100 flex">
            <div className="options_div">
               <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
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
                     "aria-labelledby": "basic-button",
                  }}
               >
                  <MenuItem onClick={PinHandler}>Pin Project</MenuItem>
               </Menu>
            </div>
            <div>
               <div className="user_profile_div">
                  <img
                     src={
                        userInfo
                           ? `/usersProfileCompress/${userInfo?.userProfile}`
                           : `/usersProfileCompress/${data?.profilePic}`
                     }
                     alt=""
                  />
               </div>
            </div>
            <div className="ms-3">
               <h5>{userInfo ? userInfo?.name : data?.forwordUser}</h5>
               <p className="text-gray-500 text-sm">
                  {userInfo ? userInfo?.email : data?.forwordUserEmail}
               </p>
               <p className="mt-3 sm:text-xl lg:text-2xl">{data?.name}</p>
               <div className="mt-3 sm:block md:flex mb-2 mb-md-0">
                  <div className="space_div">
                     <FcAdvance className="me-2" />
                     <p className="text-sm">Forword time</p>
                  </div>
                  <p className="text-sm text-gray-500">
                     {createdAt
                        ? dayjs(createdAt).format("DD/MMMM/YY, h:m:s A")
                        : dayjs(data?.createdAt).format("DD/MMMM/YY, h:m:s A")}
                  </p>
               </div>
               <div className="mt-2 sm:block md:flex mb-2 mb-md-0">
                  <div className="space_div">
                     <FcOvertime className="me-2" />
                     <p className="text-sm">Project start date</p>
                  </div>
                  <p className="text-sm text-gray-500">
                     {dayjs(data?.ProjectDateStart).format("DD/MMMM/YY, h:m:s A")}
                  </p>
               </div>
               <div className="mt-2 sm:block md:flex mb-2 mb-md-0">
                  <div className="space_div">
                     <FcHighPriority className="me-2" />
                     <p className="text-sm">Project end date</p>
                  </div>
                  <p className="text-sm text-gray-500">
                     {dayjs(data?.ProjectDateEnd).format("DD/MMMM/YY, h:m:s A")}
                  </p>
               </div>
               <div className="mt-2 sm:block md:flex mb-2 mb-md-0">
                  <div className="space_div">
                     <FcOnlineSupport className="me-2" />
                     <p className="text-sm">Client name</p>
                  </div>
                  <p className="text-sm text-gray-500">{data?.clientName}</p>
               </div>
               <div className="mt-2 sm:block md:flex mb-2 mb-md-0">
                  <div className="space_div">
                     <FcRatings className="me-2" />
                     <p className="text-sm">Client email</p>
                  </div>
                  <p className="text-sm text-gray-500">{data?.clientEmail}</p>
               </div>
               {data?.description ? (
                  <>
                     <h5 className="mt-3 ">Project description</h5>
                     <p className="mt-1 text-sm text-gray-500">{data?.description}</p>
                  </>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default ProjectNotificationCartComponent;
