import React, { useState } from "react";
import * as styled from "./UserProfileAndMessageComponent.style";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AiFillPushpin } from "@react-icons/all-files/ai/AiFillPushpin";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";

function UserProfileAndMessageComponent({ pos, messageCl, data }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [cookies] = useCookies(["_ijp_at_user"]);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <styled.div className={`mb-4 w-100 flex justify-${pos}`}>
         <div className={data?.userRemoved ? "userRemove_notification_div" : null}>
            <styled.userProfileDiv className={`flex items-center `}>
               <div className="profile">
                  <img src={`/usersProfileCompress/${data?.userInfo?.profilePic}`} alt="" />
               </div>
               <p className="ms-2">
                  <strong className="text-gray-100">{data?.userInfo?.name}</strong>
                  <span className="text-gray-100 ms-1">{dayjs(data?.createdAt).format("HH:ss A")}</span>
               </p>
            </styled.userProfileDiv>
            <div>
               <styled.chatMessageDiv className={messageCl ? `messageChat_div ${messageCl}` : `messageChat_div bg-gray-200 shadow`}>
                  {/* {!!cookies && cookies?._ijp_at_user && cookies?._ijp_at_user?.role === "subAdmin" ? (
                     <div
                        className="options_div"
                        style={
                           !!cookies && cookies?._ijp_at_user && cookies?._ijp_at_user?._id !== data?.userInfo?._id
                              ? {
                                   right: "-50px",
                                }
                              : {
                                   left: "-50px",
                                }
                        }
                     >
                        <div>
                           <Button
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                           >
                              <BsThreeDotsVertical className="text-white cursor-pointer" />
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
                              <MenuItem onClick={handleClose}>
                                 <div className="flex items-center">
                                    <AiFillPushpin className="text-green-500" />
                                    <p className="ms-2 text-sm">Pin message to admin</p>
                                 </div>
                              </MenuItem>
                           </Menu>
                        </div>
                     </div>
                  ) : null} */}
                  <p className={messageCl ? "text-white" : " text-gray-800"}>{data?.message}</p>
               </styled.chatMessageDiv>
            </div>
         </div>
      </styled.div>
   );
}

export default UserProfileAndMessageComponent;
