import React, { useState } from "react";
import * as styled from "./GroupChatComponent.style";
import { BiDotsHorizontalRounded } from "@react-icons/all-files/bi/BiDotsHorizontalRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdReport } from "@react-icons/all-files/md/MdReport";
import { IoIosGitPullRequest } from "@react-icons/all-files/io/IoIosGitPullRequest";
import { useParams } from "react-router";
import { Outlet } from "react-router";

function GroupChatComponent() {
   const [OptionTabShow, setOptionTabShow] = useState(null);
   const open = Boolean(OptionTabShow);
   const params = useParams();

   const handleClick = (event) => {
      setOptionTabShow(event.currentTarget);
   };

   const handleClose = () => {
      setOptionTabShow(null);
   };

   return (
      <styled.div>
         <div className="flex items-center justify-between p-3 border-bottom groupChat_Header_div">
            <div>
               <h1 className="groupNameHeading">{params?.name.replaceAll("-", " ")}</h1>
            </div>
            <div>
               <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
               >
                  <BiDotsHorizontalRounded className="text-gray-700 text-xl" />
               </Button>
               <Menu
                  id="basic-menu"
                  anchorEl={OptionTabShow}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                     "aria-labelledby": "basic-button",
                  }}
               >
                  <MenuItem onClick={handleClose}>
                     <div className="flex items-center">
                        <MdReport className="text-red-600" />
                        <p className="text-sm ms-1">Report</p>
                     </div>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                     <div className="flex items-center">
                        <IoIosGitPullRequest className="text-green-600" />
                        <p className="text-sm ms-1">Request to add another user</p>
                     </div>
                  </MenuItem>
               </Menu>
            </div>
         </div>
         <Outlet />
      </styled.div>
   );
}

export default GroupChatComponent;
