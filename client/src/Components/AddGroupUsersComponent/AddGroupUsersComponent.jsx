import React, { useContext } from "react";
import ReactDom from "react-dom";
import * as styled from "./AddGroupUsersComponent.style";
import { GrFormAdd } from "@react-icons/all-files/gr/GrFormAdd";
import { useSelector } from "react-redux";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import PaginationFooterComponent from "../PaginationFooterComponent/PaginationFooterComponent";
import { getAllLoginUsers } from "../../App/Features/Admin/adminSlice";
import { useParams } from "react-router";
import { SocketContext } from "../../Context/socket";
import { message } from "antd";
import { useCookies } from "react-cookie";

function AddGroupUsersComponent({ event }) {
   const [cookie] = useCookies(["_ijp_at_user"]);
   const socket = useContext(SocketContext);
   const params = useParams();
   const { allUsers, allUsersFetchLoading, allUsersFetchError } = useSelector(
      (state) => state.admin
   );
   const { groupInfo } = useSelector((state) => state.group);

   const HidHandler = function (e) {
      const id = e.target.id;
      if (id === "overFlow") {
         event();
      }
   };

   const GroupUserAddHandler = function (elem) {
      const { id } = params;

      const GroupEventHandler = function () {
         socket.emit("_add_group_users", {
            data: elem,
            groupId: id,
            groupName: params.name,
            token: cookie?._ijp_at_user?.token,
            profilePic: cookie?._ijp_at_user?.profilePic,
         });
      };

      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (groupInfo?.data && groupInfo?.data?.groupUsers && groupInfo?.data?.groupUsers.length) {
            const userInGroup = groupInfo?.data?.groupUsers.find((el) => el.userId === elem._id);

            if (!!userInGroup) {
               message.info("User already exists in group");
            } else {
               GroupEventHandler();
            }
         } else {
            GroupEventHandler();
         }
      }
   };

   return ReactDom.createPortal(
      <styled.div onClick={HidHandler} id="overFlow">
         <styled.mainDiv>
            <h5>Add group users</h5>
            <hr className="mt-3 mb-3" />
            <p className="text-gray-700 mb-3">Users</p>
            {allUsersFetchLoading ? (
               <div>
                  <SpennerComponent />
               </div>
            ) : null}
            {!!allUsersFetchError ? <p>{allUsersFetchError}</p> : null}
            {!!allUsers && allUsers?.success && allUsers?.users.length ? (
               allUsers?.users.map((el) => (
                  <div className="flex items-center justify-between  user_list_div" key={el._id}>
                     <div className="flex items-center">
                        <div className="image_div">
                           <img src={`/usersProfileCompress/${el?.userProfile}`} alt="" />
                        </div>
                        <div className="userInfo_div ms-2">
                           <h5>{el?.name}</h5>
                           <p className="text-sm text-gray-700 mt-1">{el?.email}</p>
                        </div>
                     </div>
                     <div>
                        <div className="add_button shadow" onClick={() => GroupUserAddHandler(el)}>
                           <GrFormAdd />
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <p className="text-center text-sm text-gray-700">No login users</p>
            )}
            <PaginationFooterComponent action={getAllLoginUsers} data={allUsers} filed={"users"} />
         </styled.mainDiv>
      </styled.div>,
      document.getElementById("application")
   );
}

export default React.memo(AddGroupUsersComponent);
