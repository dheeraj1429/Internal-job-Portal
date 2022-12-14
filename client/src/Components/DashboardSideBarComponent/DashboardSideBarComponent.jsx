import React, { useEffect, useContext, useRef } from "react";
import * as styled from "./DashboardSideBarComponent.style";
import SidebarInnerSmComponent from "../SidebarInnerSmComponent/SidebarInnerSmComponent";
import { BsBag } from "@react-icons/all-files/bs/BsBag";
import UserProfileComponent from "../../HelperComponents/UserProfileComponent/UserProfileComponent";
import { useSelector, useDispatch } from "react-redux";
import { IoIosLogOut } from "@react-icons/all-files/io/IoIosLogOut";
import { useCookies } from "react-cookie";
import { logOutUser } from "../../App/Features/Auth/AuthSlice";
import { AiOutlineFileZip } from "@react-icons/all-files/ai/AiOutlineFileZip";
import { RiUserSettingsLine } from "@react-icons/all-files/ri/RiUserSettingsLine";
import SidebarTabComponent from "../SidebarTabComponent/SidebarTabComponent";
import { DiGhostSmall } from "@react-icons/all-files/di/DiGhostSmall";
import { MdPlaylistAdd } from "@react-icons/all-files/md/MdPlaylistAdd";
import {
   createEmployeesGroup,
   getUserGroups,
   getUserIncludeGroups,
   groupUserHandler,
   addGroupUsers,
   employeesGroupHandler,
} from "../../App/Features/Group/groupSlice";
import { message } from "antd";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "@react-icons/all-files/bi/BiMessageSquareDetail";
import { SocketContext } from "../../Context/socket";
import { TiGroup } from "@react-icons/all-files/ti/TiGroup";
import { useParams } from "react-router-dom";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { VscBell } from "@react-icons/all-files/vsc/VscBell";
import { VscGroupByRefType } from "@react-icons/all-files/vsc/VscGroupByRefType";
import { AiOutlineFundProjectionScreen } from "@react-icons/all-files/ai/AiOutlineFundProjectionScreen";

function DashboardSideBarComponent() {
   const socket = useContext(SocketContext);
   const SidebarRef = useRef(null);
   const params = useParams();

   const [cookies, _, removeCookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);
   const { employeesGroup } = useSelector((state) => state.group);

   const logOutHandler = function () {
      removeCookie("_ijp_at_user");
      dispatch(logOutUser({ data: null }));
   };

   const SidebarToggleHandler = function () {
      if (window.innerWidth >= 600) {
         return;
      } else {
         SidebarRef.current.classList.toggle("Mini_sidebar");
      }
   };

   const GroupCreateHandler = function (messageInfo, args) {
      message.success(messageInfo);
      socket.emit("_join_group", {
         groupId: args?.groupInfo?.[0]?.groupData?._id,
         user: cookies?._ijp_at_user,
      });
      dispatch(createEmployeesGroup(args));
   };

   const AddUsersInGroupsHandler = function (args) {
      message.info(args?.message);
      socket.emit("_join_group", {
         groupId: args?.groupInfo?.[0]?.groupData?._id,
         user: cookies?._ijp_at_user,
      });
      dispatch(createEmployeesGroup(args));
   };

   const GroupCreateBroadCastLstener = function (args) {
      if (args.groupEmployeesIds.includes(cookies?._ijp_at_user?._id)) {
         let messageInfo = `${args.groupAdmin} add you in ${args?.groupInfo?.[0]?.groupData?.groupName} group`;
         GroupCreateHandler(messageInfo, args);
      }

      if (cookies?._ijp_at_user?.role === "subAdmin") {
         let messageInfo = `${args.groupAdmin} create a new ${args?.groupInfo?.[0]?.groupData?.groupName} group`;
         GroupCreateHandler(messageInfo, args);
      }
   };

   const UserGroupActivityHandler = function (args) {
      if (cookies?._ijp_at_user?.role === "admin" || cookies?._ijp_at_user?.role === "subAdmin") {
         dispatch(groupUserHandler(args));
      } else if (cookies?._ijp_at_user?.role === "employee") {
         dispatch(employeesGroupHandler(args));
      }
   };

   const ProjectNotificationHandler = function (args) {
      if (args?.success) {
         message.success(args.message);
      } else {
         message.info(args.message);
      }
   };

   useEffect(() => {
      if (!!cookies && cookies?._ijp_at_user && cookies?._ijp_at_user?.token) {
         if (
            cookies?._ijp_at_user?.role === "admin" ||
            cookies?._ijp_at_user?.role === "subAdmin"
         ) {
            dispatch(getUserGroups({ token: cookies?._ijp_at_user?.token }));
         } else if (cookies?._ijp_at_user?.role === "employee") {
            dispatch(getUserIncludeGroups({ token: cookies?._ijp_at_user?.token }));
         }

         socket.on("_group_created_broadCast", GroupCreateBroadCastLstener);
         socket.on("_user_added_in_group", AddUsersInGroupsHandler);
         socket.on("_user_group_activity_response", UserGroupActivityHandler);
         socket.on("_project_notification", ProjectNotificationHandler);
      }

      return () => {
         socket.off("_group_created_broadCast", GroupCreateBroadCastLstener);
         socket.off("_user_added_in_group", AddUsersInGroupsHandler);
         socket.off("_user_group_activity_response", UserGroupActivityHandler);
         socket.off("_project_notification", ProjectNotificationHandler);
      };
   }, []);

   useEffect(() => {
      const UserAddedInGroupRespose = function (args) {
         if (
            cookies?._ijp_at_user?.role === "admin" ||
            cookies?._ijp_at_user?.role === "subAdmin"
         ) {
            if (args?.userGroupData?.groupId === params?.id) {
               dispatch(addGroupUsers(args?.userGroupData));
            }

            if (args?.insertedUserData?._id === cookies?._ijp_at_user?._id) {
               message.success(args.message);
               dispatch(groupUserHandler(args));
            } else if (args?.insertedUserData?.userId === cookies?._ijp_at_user?._id) {
               message.success(args.message);
            }
         }
      };

      if (params?.id) {
         socket.on("_user_add_response", UserAddedInGroupRespose);
      }
      return () => socket.off("_user_add_response", UserAddedInGroupRespose);
   }, [params]);

   return (
      <styled.div ref={SidebarRef} className="bg-zinc-800 sidebarOverDiv">
         <div className="ms-3 sidebarToggleButton shadow" onClick={SidebarToggleHandler}>
            <AiOutlineBars />
         </div>
         <UserProfileComponent />
         <SidebarTabComponent icon={<DiGhostSmall />} heading={"Dashboard"} dropIcon={true}>
            <SidebarInnerSmComponent
               icon={<BsBag />}
               active={false}
               link={"/"}
               heading={"job"}
               HideAndShowMiniSidebar={SidebarToggleHandler}
            />
            {!!user && user?.userObject && user?.userObject?.role === "admin" ? (
               <>
                  <SidebarInnerSmComponent
                     icon={<AiOutlineFileZip />}
                     link={"/applications"}
                     heading={"Applications"}
                     HideAndShowMiniSidebar={SidebarToggleHandler}
                  />
                  <SidebarInnerSmComponent
                     icon={<RiUserSettingsLine />}
                     link={"/all-users"}
                     heading={"All users"}
                     HideAndShowMiniSidebar={SidebarToggleHandler}
                  />
                  <SidebarInnerSmComponent
                     icon={<MdPlaylistAdd />}
                     link={"/groups"}
                     heading={"Groups"}
                     HideAndShowMiniSidebar={SidebarToggleHandler}
                  />
                  <SidebarInnerSmComponent
                     icon={<AiOutlineFundProjectionScreen />}
                     link={"/projects"}
                     heading={"Projects"}
                     HideAndShowMiniSidebar={SidebarToggleHandler}
                  />
               </>
            ) : null}
            {!!user ? (
               <SidebarInnerSmComponent
                  icon={<IoIosLogOut />}
                  heading={"log out"}
                  onClick={logOutHandler}
                  link={"/portal/signin"}
                  HideAndShowMiniSidebar={SidebarToggleHandler}
               />
            ) : null}
         </SidebarTabComponent>
         {!!employeesGroup && employeesGroup?.success && !!employeesGroup?.groupInfo ? (
            <SidebarTabComponent icon={<TiGroup />} heading={"Groups"} dropIcon={true}>
               {!!employeesGroup?.groupInfo &&
                  employeesGroup?.groupInfo.map((el) => (
                     <div key={el?.groupData?._id || el?._id}>
                        <Link
                           to={`/groups/${
                              el?.groupData?.groupName.replaceAll(" ", "-") ||
                              el?.groupName.replaceAll(" ", "-")
                           }/${el.groupData?._id || el?._id}`}
                        >
                           <SidebarTabComponent
                              HideAndShowMiniSidebar={SidebarToggleHandler}
                              dropIcon={false}
                              icon={<BiMessageSquareDetail />}
                              heading={
                                 el.groupData?.groupName.replaceAll("-", " ") ||
                                 el?.groupName.replaceAll("-", " ")
                              }
                           />
                        </Link>
                     </div>
                  ))}
            </SidebarTabComponent>
         ) : null}
         {!!user && user?.userObject && user?.userObject?.role === "admin" ? (
            <SidebarTabComponent icon={<VscBell />} heading={"Notifications"} dropIcon={true}>
               <SidebarInnerSmComponent
                  icon={<VscGroupByRefType />}
                  link={"/groups-notifications"}
                  heading={"Group notification"}
                  HideAndShowMiniSidebar={SidebarToggleHandler}
               />
            </SidebarTabComponent>
         ) : null}
         {!!user && user?.userObject && user?.userObject?.role === "subAdmin" ? (
            <SidebarTabComponent icon={<VscBell />} heading={"Notifications"} dropIcon={true}>
               <SidebarInnerSmComponent
                  icon={<VscGroupByRefType />}
                  heading={"Project notifications"}
                  HideAndShowMiniSidebar={SidebarToggleHandler}
                  link={"/projects/notifications"}
               />
            </SidebarTabComponent>
         ) : null}
      </styled.div>
   );
}

export default React.memo(DashboardSideBarComponent);
