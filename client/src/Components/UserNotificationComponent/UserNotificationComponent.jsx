import React from "react";
import * as styled from "./UserNotificationComponent.style";
import dayjs from "dayjs";

function UserNotificationComponent({ data }) {
   return (
      <styled.div>
         <div className="flex">
            <div className="me-3">
               <div className="user_image_div shadow">
                  <img src={`/usersProfileCompress/${data?.pinnedUserProfile}`} alt="" />
               </div>
            </div>
            <div className="notification_content">
               <div className="flex items-center">
                  <div className="nf_div bg-gray-200">
                     <h5>
                        <strong>{data?.pinnedUserName}</strong>{" "}
                        <span className="text-gray-600">pinned message from</span>{" "}
                        <strong>{data?.groupName.replaceAll("-", " ")}</strong>
                     </h5>
                  </div>
                  <div className="time_div">
                     <span className="ms-2 text-gray-500 text-sm">
                        {dayjs(data?.createdAt).format("DD/MMMM hh:mm:ss A")}
                     </span>
                  </div>
               </div>
               <div className="mt-3 flex">
                  <div>
                     <div className="user_image_div shadow me-2 sm_im">
                        <img src={`/usersProfileCompress/${data?.userInfo?.profilePic}`} alt="" />
                     </div>
                  </div>
                  <div className="message_div">
                     <p className="text-gray-500">{data?.message}</p>
                  </div>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default UserNotificationComponent;
