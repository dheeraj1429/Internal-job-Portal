import React, { useState, useContext, useEffect } from "react";
import * as styled from "./UserProfileAndMessageComponent.style";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AiFillPushpin } from "@react-icons/all-files/ai/AiFillPushpin";
import { useCookies } from "react-cookie";
import { SocketContext } from "../../Context/socket";
import { useParams } from "react-router";

function UserProfileAndMessageComponent({ pos, messageCl, data }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [cookies] = useCookies(["_ijp_at_user"]);
   const [PinnedMessagesId, setPinnedMessagesId] = useState([]);
   const socket = useContext(SocketContext);
   const open = Boolean(anchorEl);
   const params = useParams();

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      socket.emit("_pin_messages_loading", { loading: true });
   };

   const handleClose = () => {
      setAnchorEl(null);
      socket.emit("_pin_messages_loading", { loading: false });
   };

   const PinnedMessagesHandler = function () {
      setAnchorEl(null);
      socket.emit("_pin_messages_loading", { loading: false });

      if (!!cookies && !!cookies?._ijp_at_user) {
         socket.emit("_pin_message_to_admin", {
            pinnedData: {
               groupName: params?.name,
               groupId: params.id,
               pinnedUserId: cookies?._ijp_at_user?._id,
               pinnedUserProfile: cookies?._ijp_at_user?.profilePic,
               pinnedUserName: cookies?._ijp_at_user?.name,
               message: data?.message,
               messageId: data?._id || data?._sender_message_id,
               userInfo: data?.userInfo,
            },
         });
      }
   };

   const PinnedMessageResposeHandler = function (args) {
      setPinnedMessagesId((prevState) => [...prevState, args.messageId]);
   };

   useEffect(() => {
      socket.on("_pinned_message_respose", PinnedMessageResposeHandler);

      return () => socket.off("_pinned_message_respose", PinnedMessageResposeHandler);
   }, []);

   return (
      <styled.div className={`mb-4 w-100 flex justify-${pos}`}>
         <div className={data?.userRemoved || data?.userAdded ? "user_notification_div" : null}>
            <styled.userProfileDiv className={`flex items-center `}>
               <div className="profile">
                  <img src={`/usersProfileCompress/${data?.userInfo?.profilePic}`} alt="" />
               </div>
               <p className="ms-2">
                  <strong className="text-gray-100">{data?.userInfo?.name}</strong>
                  {/* <span className="text-gray-100 ms-1">
                     {dayjs(data?.createdAt).format("HH:ss A")}
                  </span> */}
               </p>
            </styled.userProfileDiv>
            <div>
               <styled.chatMessageDiv
                  className={
                     messageCl
                        ? `messageChat_div ${messageCl}`
                        : `messageChat_div bg-gray-200 shadow`
                  }
               >
                  {data?.pinned ? (
                     <div className="message_sus_send">
                        <AiFillPushpin className="text-red-500" />
                     </div>
                  ) : null}
                  {PinnedMessagesId.length ? (
                     data?._id && PinnedMessagesId.includes(data?._id) ? (
                        <div className="message_sus_send">
                           <AiFillPushpin className="text-red-500" />
                        </div>
                     ) : data?._sender_message_id &&
                       PinnedMessagesId.includes(data?._sender_message_id) ? (
                        <div className="message_sus_send">
                           <AiFillPushpin className="text-red-500" />
                        </div>
                     ) : null
                  ) : null}
                  {!!cookies &&
                  cookies?._ijp_at_user &&
                  !data?.userRemoved &&
                  !data?.userAdded &&
                  !data?.pinned &&
                  cookies?._ijp_at_user?.role === "subAdmin" &&
                  !PinnedMessagesId.includes(data?._id) &&
                  !PinnedMessagesId.includes(data?._sender_message_id) ? (
                     <div
                        className="options_div"
                        style={
                           !!cookies &&
                           cookies?._ijp_at_user &&
                           cookies?._ijp_at_user?._id !== data?.userInfo?._id
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
                              <MenuItem onClick={PinnedMessagesHandler}>
                                 <div className="flex items-center">
                                    <AiFillPushpin className="text-green-500" />
                                    <p className="ms-2 text-sm">Pin message to admin</p>
                                 </div>
                              </MenuItem>
                           </Menu>
                        </div>
                     </div>
                  ) : null}
                  <p className={messageCl ? "text-white" : " text-gray-800"}>{data?.message}</p>
               </styled.chatMessageDiv>
            </div>
         </div>
      </styled.div>
   );
}

export default UserProfileAndMessageComponent;
