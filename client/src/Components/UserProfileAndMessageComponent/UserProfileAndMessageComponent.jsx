import React from "react";
import * as styled from "./UserProfileAndMessageComponent.style";

function UserProfileAndMessageComponent({ pos, messageCl, data }) {
   return (
      <styled.div className={`mb-4 w-100 flex justify-${pos}`}>
         <div>
            <styled.userProfileDiv className={`flex items-center `}>
               <div className="profile shadow">
                  <img src={`/usersProfileCompress/${data?.userInfo?.profilePic}`} alt="" />
               </div>
               <p className="ms-2">
                  <strong className="text-gray-700">{data?.userInfo?.name}</strong>
                  <span className="text-gray-600 ms-1">3:10 AM</span>
               </p>
            </styled.userProfileDiv>
            <styled.chatMessageDiv className={messageCl ? messageCl : `bg-gray-200`}>
               <p className={messageCl ? "text-white" : " text-gray-800"}>{data?.message}</p>
            </styled.chatMessageDiv>
         </div>
      </styled.div>
   );
}

export default UserProfileAndMessageComponent;
