import React, { useState } from 'react';
import * as styled from './UserProfileComponent.style';
import { useSelector } from 'react-redux';
import UserProfileOptionComponent from '../../DashboardComponent/UserProfileOptionComponent/UserProfileOptionComponent';

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
            <styled.div className="p-3 flex items-center">
               <div>
                  <div className="userProfileDiv" onClick={() => ShowAndHideHandler()}>
                     <img
                        src={`/usersProfileCompress/${
                           !!userContactSaveInfo?.updatedData?.profilePic
                              ? userContactSaveInfo?.updatedData.profilePic
                              : user.userObject.profilePic
                        }`}
                        alt=""
                     />
                  </div>
               </div>
               <div className="userProfileInfo ms-2">
                  <h5 className="text-white mb-1">
                     {!!userContactSaveInfo?.updatedData?.name
                        ? userContactSaveInfo.updatedData?.name
                        : user.userObject.name}
                  </h5>
                  <p className=" text-gray-300">{user.userObject.email}</p>
               </div>
               <UserProfileOptionComponent onClick={hideShowHandler} show={ShowOptions} />
            </styled.div>
         ) : null}
      </>
   );
}

export default React.memo(UserProfileComponent);
