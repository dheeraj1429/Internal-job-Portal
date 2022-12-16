import React, { useEffect } from "react";
import * as styled from "./ShowUserDetailsComponent.style";
import { useParams } from "react-router";
import UserProfileDetailsComponent from "../UserProfileDetailsComponent/UserProfileDetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { getUserDetails } from "../../App/Features/Admin/adminSlice";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";

function ShowUserDetailsComponent() {
   const [cookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();
   const params = useParams();

   const { singleUserDetails, singleUserDetailsLoading, singleUserDetailsFetchError } = useSelector(
      (state) => state.admin
   );

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         dispatch(getUserDetails({ token: cookie?._ijp_at_user?.token, userId: params?.userId }));
      }
   }, [params?.userId]);

   return (
      <styled.div className=" relative w-100 h-100">
         {!!singleUserDetailsLoading ? <SpennerComponent center={true} /> : null}
         {!!singleUserDetails && singleUserDetails?.success && singleUserDetails?.userInfo ? (
            <>
               <div className="user_profile_bg_div"></div>
               <div className="container pt-4">
                  <UserProfileDetailsComponent />
                  <div className="row mt-4 px-4">
                     {!!singleUserDetails?.userInfo?.bio ? (
                        <p className="text-gray-600 text-sm">{singleUserDetails?.userInfo?.bio}</p>
                     ) : null}
                  </div>
               </div>
               {!!singleUserDetails?.userInfo?.skills &&
               singleUserDetails?.userInfo?.skills.length ? (
                  <div className=" px-4 mt-4">
                     <h5 className="mb-3 text-2xl text-gray-600">My Skills</h5>
                     <div className="userSkillsDiv">
                        {singleUserDetails?.userInfo?.skills.map((el) => (
                           <div
                              className="px-2 py-1 rounded shadow me-3 relative pr_div mb-3"
                              key={el._id}
                           >
                              <div className="hover_div bg-black">
                                 <p className="text-white">{el?.yearOfExperience}</p>
                              </div>
                              <p className="text-sm text-gray-700">{el.skill}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               ) : null}
            </>
         ) : null}
         {!!singleUserDetailsFetchError ? (
            <div className="p-2">
               <p>{singleUserDetailsFetchError}</p>
            </div>
         ) : null}
      </styled.div>
   );
}

export default ShowUserDetailsComponent;
