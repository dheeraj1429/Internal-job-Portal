import React, { useContext } from "react";
import * as styled from "./UserProfilePreviewComponent.style";
import { VscChromeClose } from "@react-icons/all-files/vsc/VscChromeClose";
import { SocketContext } from "../../Context/socket";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function UserProfilePreviewComponent({ data, groupId }) {
   const param = useParams();
   const [cookie] = useCookies(["_ijp_at_user"]);
   const socket = useContext(SocketContext);

   const RemoveUserFromGroup = function (userId) {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         socket.emit("_remove_group_users", {
            groupName: param?.name,
            token: cookie?._ijp_at_user?.token,
            groupId: param.id,
            userId,
         });
      }
   };

   return (
      <styled.div className="shadow border rounded-xl flex items-center mb-4 justify-between">
         <div className="flex items-center">
            <div>
               <Link to={`/groups/${param.name.replaceAll(" ", "-")}/${groupId}/${data?.userId}`}>
                  <div className="user_profile_div">
                     <img src={`/usersProfileCompress/${data?.user?.userProfile}`} alt="" />
                  </div>
               </Link>
            </div>
            <div className="user_content_info_div ms-3">
               <h5>{data?.user?.name}</h5>
               <p className="mt-1 text-gray-600">{data?.user?.email}</p>
            </div>
         </div>
         {!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.role === "admin" ? (
            <div
               className="close_button_div shadow"
               onClick={() => RemoveUserFromGroup(data?.userId)}
            >
               <div className="hover_div">
                  <p>Remove</p>
               </div>
               <VscChromeClose />
            </div>
         ) : null}
      </styled.div>
   );
}

export default UserProfilePreviewComponent;
