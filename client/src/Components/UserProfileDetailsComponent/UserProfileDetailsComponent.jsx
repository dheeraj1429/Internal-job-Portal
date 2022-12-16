import React from "react";
import * as styled from "./UserProfileDetailsComponent.style";
import { BsPhoneLandscape } from "@react-icons/all-files/bs/BsPhoneLandscape";
import { GoLocation } from "@react-icons/all-files/go/GoLocation";
import { useSelector } from "react-redux";

function UserProfileDetailsComponent() {
   const { singleUserDetails } = useSelector((state) => state.admin);

   return (
      <styled.div>
         <div className="row align-items-center justify-content-center relative">
            <div className="col-3 flex justify-center ps-3">
               <div className="user_profile_div shadow">
                  <img src={`/usersProfile/${singleUserDetails?.userInfo?.userProfile}`} alt="" />
               </div>
            </div>
            <div className="col-9">
               <h1 className="text-4xl font-normal text-gray-900">
                  {singleUserDetails?.userInfo?.name}
               </h1>
               <p className="text-gray-500 mt-2">{singleUserDetails?.userInfo?.email}</p>
               <div className="mt-3 flex  items-center">
                  {singleUserDetails?.userInfo?.phone ? (
                     <div className="flex items-center">
                        <BsPhoneLandscape className="text-gray-500" />
                        <p className=" text-sm text-gray-700 ms-2">
                           {singleUserDetails?.userInfo?.phone}
                        </p>
                     </div>
                  ) : null}
                  {singleUserDetails?.userInfo?.street ? (
                     <div className="flex items-center ms-4">
                        <GoLocation className="text-gray-500" />
                        <p className=" text-sm text-gray-700 ms-2">
                           {singleUserDetails?.userInfo?.street}
                        </p>
                     </div>
                  ) : null}
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default UserProfileDetailsComponent;
