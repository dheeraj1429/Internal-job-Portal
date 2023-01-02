import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import { HiOutlineDotsHorizontal } from "@react-icons/all-files/hi/HiOutlineDotsHorizontal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import * as styled from "./ProjectCardComponent.style";
import { useDispatch } from "react-redux";
import { deleteJobProject } from "../../App/Features/Admin/adminSlice";
import { useCookies } from "react-cookie";
import { SocketContext } from "../../Context/socket";

function ProjectCardComponent({ el }) {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch();

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const EditHandler = function (id) {
      setAnchorEl(null);
   };

   const DeleteHandler = function (id) {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         setAnchorEl(null);
         dispatch(
            deleteJobProject({
               token: cookie?._ijp_at_user?.token,
               jobId: id,
            })
         );
      }
   };

   const PinProjectHandler = function () {
      setAnchorEl(null);
      socket.emit("_pin_projects", {
         ...el,
         profilePic: cookie?._ijp_at_user?.profilePic,
         userId: cookie?._ijp_at_user?._id,
         forwordUser: cookie?._ijp_at_user?.name,
         forwordUserEmail: cookie?._ijp_at_user?.email,
      });
   };

   return (
      <styled.div className="col-12 col-md-6 col-lg-4 col-xll-3 mb-4 mb-md-0" key={el._id}>
         <div className="project_card shadow w-100 rounded-md">
            <div className="options_div">
               <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
               >
                  <HiOutlineDotsHorizontal />
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
                  <MenuItem onClick={() => EditHandler(el._id)}>Edit</MenuItem>
                  <MenuItem onClick={() => DeleteHandler(el._id)}>Delete</MenuItem>
                  <MenuItem onClick={PinProjectHandler}>Pin project to subAdmin</MenuItem>
               </Menu>
            </div>
            <p className="text-gray-700 text-lg">{el?.name}</p>
            <div className="flex mt-3">
               <div className="space_div">
                  <h5>Service </h5>
               </div>
               <p className="text-gray-500 text-sm">{el?.service}</p>
            </div>
            <div className="flex mt-2">
               <div className="space_div">
                  <h5>Client </h5>
               </div>
               <p className="text-gray-500 text-sm">{el?.clientName}</p>
            </div>
            <div className="flex mt-2">
               <div className="space_div">
                  <h5>Client email </h5>
               </div>
               <p className="text-gray-500 text-sm">{el?.clientEmail}</p>
            </div>
            <div className="flex mt-2">
               <div className="space_div">
                  <h5>Client number </h5>
               </div>
               <p className="text-gray-500 text-sm">{el?.clientNumber}</p>
            </div>
            <p className="mt-3">Description</p>
            <p className="text-gray-500 text-sm mt-1">{el?.description.slice(0, 160)}...</p>
            <p className="mt-3 text-sm">Project start date</p>
            <p className="text-gray-500 text-sm mt-1">
               {dayjs(el?.ProjectDateStart).format("DD/MMMM/YYYY H:mm:s A")}
            </p>
            <p className="mt-3 text-sm">Project end date</p>
            <p className="text-gray-500 text-sm mt-1">
               {dayjs(el?.ProjectDateEnd).format("DD/MMMM/YYYY H:mm:s A")}
            </p>
         </div>
      </styled.div>
   );
}

export default ProjectCardComponent;
