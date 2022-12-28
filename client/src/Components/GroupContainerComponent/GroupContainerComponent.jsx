import React, { useEffect, useContext, useState } from "react";
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
import { BiDotsVerticalRounded } from "@react-icons/all-files/bi/BiDotsVerticalRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddGroupUsersComponent from "../AddGroupUsersComponent/AddGroupUsersComponent";
import { getAllLoginUsers, removeAccountInfo } from "../../App/Features/Admin/adminSlice";

function GroupContainerComponent() {
   const socket = useContext(SocketContext);
   const [ShowGroupOptions, setShowGroupOptions] = useState(false);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const [anchorEl, setAnchorEl] = useState(null);
   const param = useParams();
   const dispatch = useDispatch();

   const { groupInfo, groupInfoLoading, groupInfoFetchError } = useSelector((state) => state.group);

   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const ShowOptionsHandler = function () {
      setShowGroupOptions(!ShowGroupOptions);
   };

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (cookie?._ijp_at_user?.role === "admin" || cookie?._ijp_at_user?.role === "subAdmin") {
            dispatch(getGroupUserInfo({ token: cookie?._ijp_at_user?.token, groupId: param.id }));
         }
         if (cookie?._ijp_at_user?.role === "admin") {
            socket.emit("_admin_join_groups", { groupId: param.id });
         }
      }
   }, [param?.id]);

   useEffect(() => {
      if (
         !!cookie &&
         cookie?._ijp_at_user &&
         cookie?._ijp_at_user?.token &&
         cookie?._ijp_at_user?.role === "admin"
      ) {
         socket.emit("_live", {
            _id: cookie?._ijp_at_user?._id,
            userName: cookie?._ijp_at_user?.name,
         });
         dispatch(getAllLoginUsers({ token: cookie?._ijp_at_user?.token, page: 0 }));
      }
      return () => {
         dispatch(removeAccountInfo());
      };
   }, []);

   return (
      <styled.div>
         <div className="container-fluid p-0 h-100">
            {ShowGroupOptions ? <AddGroupUsersComponent event={ShowOptionsHandler} /> : null}
            {!!cookie && cookie?._ijp_at_user ? (
               cookie?._ijp_at_user?.role === "admin" ||
               cookie?._ijp_at_user?.role === "subAdmin" ? (
                  <div className="row gx-0 h-100">
                     <div className="col-12 col-md-6 col-lg-4 bg-gray-100">
                        <div className="user_list_div border">
                           <div className="border-bottom p-3">
                              <SearchBoxComponent />
                           </div>
                           <div className="p-3 scroll_div relative">
                              <div className="flex items-center justify-between mb-3">
                                 <h1 className="md:text-lg text-2xl text-gray-700 lg:text-2xl">
                                    {param?.name.replaceAll("-", " ")}
                                 </h1>
                                 {cookie?._ijp_at_user?.role === "admin" ? (
                                    <>
                                       <Button
                                          id="basic-button"
                                          aria-controls={open ? "basic-menu" : undefined}
                                          aria-haspopup="true"
                                          aria-expanded={open ? "true" : undefined}
                                          onClick={handleClick}
                                       >
                                          <BiDotsVerticalRounded className=" cursor-pointer text-gray-700" />
                                       </Button>
                                       <Menu
                                          id="basic-menu"
                                          anchorEl={anchorEl}
                                          open={open}
                                          onClose={handleClose}
                                          MenuListProps={{
                                             "aria-labelledby": "basic-button",
                                          }}
                                       >
                                          <MenuItem
                                             onClick={() => {
                                                ShowOptionsHandler();
                                                handleClose();
                                             }}
                                          >
                                             Add group users
                                          </MenuItem>
                                       </Menu>
                                    </>
                                 ) : null}
                              </div>
                              {!!groupInfoLoading ? <SpennerComponent center={true} /> : null}
                              {!!groupInfoFetchError ? (
                                 <p className="error_text">{groupInfoFetchError}</p>
                              ) : null}
                              {!!groupInfo &&
                              groupInfo?.success &&
                              groupInfo?.data &&
                              groupInfo.data?.groupUsers.length
                                 ? groupInfo.data?.groupUsers.map((el) => (
                                      <UserProfilePreviewComponent
                                         key={el._id}
                                         data={el}
                                         groupId={groupInfo.data?._id}
                                      />
                                   ))
                                 : null}
                           </div>
                        </div>
                     </div>
                     <div className="col-12 col-md-6 col-lg-8 renderDiv">
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
