import React, { useEffect, useContext } from "react";
import * as styled from "./GroupContainerComponent.style";
import SearchBoxComponent from "../SearchBoxComponent/SearchBoxComponent";
import UserProfilePreviewComponent from "../UserProfilePreviewComponent/UserProfilePreviewComponent";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getGroupUserInfo } from "../../App/Features/Group/groupSlice";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import { Outlet } from "react-router";
import GroupChatComponent from "../GroupChatComponent/GroupChatComponent";
import { SocketContext } from "../../Context/socket";

function GroupContainerComponent() {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const param = useParams();
   const dispatch = useDispatch();

   const { groupInfo, groupInfoLoading, groupInfoFetchError } = useSelector((state) => state.group);

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (cookie?._ijp_at_user?.role === "admin" || cookie?._ijp_at_user?.role === "subAdmin") {
            dispatch(getGroupUserInfo({ token: cookie?._ijp_at_user?.token, groupId: param.id }));
         }
      }
   }, [param?.id]);

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         socket.emit("_live", {
            _id: cookie?._ijp_at_user?._id,
            userName: cookie?._ijp_at_user?.name,
         });
      }
   }, []);

   return (
      <styled.div>
         <div className="container-fluid p-0 h-100">
            {!!cookie && cookie?._ijp_at_user ? (
               cookie?._ijp_at_user?.role === "admin" || cookie?._ijp_at_user?.role === "subAdmin" ? (
                  <div className="row gx-0 h-100">
                     <div className="col-6 col-md-5 col-lg-4 bg-gray-100">
                        <div className="user_list_div border">
                           <div className="border-bottom p-3">
                              <SearchBoxComponent />
                           </div>
                           <div className="p-3 scroll_div relative">
                              <h1 className="mb-3 text-3xl text-gray-700 lg:text-2xl">{param?.name.replaceAll("-", " ")}</h1>
                              {!!groupInfoLoading ? <SpennerComponent center={true} /> : null}
                              {!!groupInfoFetchError ? <p className="error_text">{groupInfoFetchError}</p> : null}
                              {!!groupInfo && groupInfo?.success && groupInfo?.data && groupInfo.data?.groupUsers.length
                                 ? groupInfo.data?.groupUsers.map((el) => (
                                      <UserProfilePreviewComponent key={el._id} data={el} groupId={groupInfo.data?._id} />
                                   ))
                                 : null}
                           </div>
                        </div>
                     </div>
                     <div className="col-6 col-md-7 col-lg-8 renderDiv">
                        <Outlet />
                     </div>
                  </div>
               ) : (
                  <GroupChatComponent />
               )
            ) : null}
         </div>
      </styled.div>
   );
}

export default GroupContainerComponent;
