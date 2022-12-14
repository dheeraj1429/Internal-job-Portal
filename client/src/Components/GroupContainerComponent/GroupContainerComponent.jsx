import React, { useEffect } from "react";
import * as styled from "./GroupContainerComponent.style";
import SearchBoxComponent from "../SearchBoxComponent/SearchBoxComponent";
import UserProfilePreviewComponent from "../UserProfilePreviewComponent/UserProfilePreviewComponent";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getGroupUserInfo } from "../../App/Features/Group/groupSlice";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";

function GroupContainerComponent() {
   const [cookie] = useCookies(["_ijp_at_user"]);
   const param = useParams();
   const dispatch = useDispatch();

   const { groupInfo, groupInfoLoading, groupInfoFetchError } = useSelector((state) => state.group);

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (cookie?._ijp_at_user?.role === "admin") {
            dispatch(getGroupUserInfo({ token: cookie?._ijp_at_user?.token, groupId: param.id }));
         }
      }
   }, [param?.id]);

   return (
      <styled.div>
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-3 bg-gray-100">
                  <div className="user_list_div border">
                     <div className="border-bottom p-3">
                        <SearchBoxComponent />
                     </div>
                     <div className="p-3 scroll_div relative">
                        {!!groupInfoLoading ? <SpennerComponent center={true} /> : null}
                        {!!groupInfoFetchError ? (
                           <p className="error_text">{groupInfoFetchError}</p>
                        ) : null}
                        {!!groupInfo &&
                        groupInfo?.success &&
                        groupInfo?.data &&
                        groupInfo.data?.groupUsers.length
                           ? groupInfo.data?.groupUsers.map((el) => (
                                <UserProfilePreviewComponent key={el._id} data={el} />
                             ))
                           : null}
                     </div>
                  </div>
               </div>
               <div className="col-9"></div>
            </div>
         </div>
      </styled.div>
   );
}

export default GroupContainerComponent;
