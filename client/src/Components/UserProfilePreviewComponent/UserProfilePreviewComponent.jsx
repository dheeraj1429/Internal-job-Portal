import React from "react";
import * as styled from "./UserProfilePreviewComponent.style";

function UserProfilePreviewComponent({ data }) {
   return (
      <styled.div className="shadow border rounded-xl flex items-center mb-4">
         <div>
            <div className="user_profile_div">
               <img src={`/usersProfileCompress/${data?.user?.userProfile}`} alt="" />
            </div>
         </div>
         <div className="user_content_info_div ms-3">
            <h5>{data?.user?.name}</h5>
            <p className="mt-1 text-gray-600">{data?.user?.email}</p>
         </div>
      </styled.div>
   );
}

export default UserProfilePreviewComponent;
