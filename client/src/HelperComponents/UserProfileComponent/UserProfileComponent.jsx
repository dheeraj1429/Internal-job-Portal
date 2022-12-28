import React, { useState } from "react";
import * as styled from "./UserProfileComponent.style";
import { useSelector } from "react-redux";
import UserProfileOptionComponent from "../../Components/UserProfileOptionComponent/UserProfileOptionComponent";

function UserProfileComponent() {
   const [ShowOptions, setShowOptions] = useState(false);
   const { user } = useSelector((state) => state.auth);
   const { userContactSaveInfo } = useSelector((state) => state.index);

   const ShowAndHideHandler = function () {
      setShowOptions(!ShowOptions);
   };

   const hideShowHandler = function () {
      setShowOptions(false);
   };

   return (
      <>
         {!!user && !!user && user?.userObject && user?.userObject?.token ? (
            <styled.div className="p-3 flex items-center justify-content-start profile_div">
               <div>
                  <div className="userProfileDiv" onClick={() => ShowAndHideHandler()}>
                     <img
                        src={`/usersProfileCompress/${
                           !!userContactSaveInfo?.updatedData?.profilePic
                              ? userContactSaveInfo?.updatedData.profilePic
                              : user.userObject.profilePic
                        }`}
                     />
                  </div>
               </div>
               <div
                  className={ShowOptions ? "overLayDiv" : "overLayDiv d-none"}
                  onClick={hideShowHandler}
               ></div>
               <div className="userProfileInfo ms-3">
                  <h5 className="mb-1 text-gray-50">
                     {!!userContactSaveInfo?.updatedData?.name
                        ? userContactSaveInfo.updatedData?.name
                        : user.userObject.name}
                  </h5>
                  <p className=" text-gray-100">{user.userObject.email}</p>
               </div>
               <UserProfileOptionComponent onClick={hideShowHandler} show={ShowOptions} />
            </styled.div>
         ) : null}
      </>
   );
}

export default React.memo(UserProfileComponent);
