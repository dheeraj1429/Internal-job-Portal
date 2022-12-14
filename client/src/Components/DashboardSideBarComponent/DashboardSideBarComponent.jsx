import React, { useEffect, useState } from "react";
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
import { AiOutlineGroup } from "@react-icons/all-files/ai/AiOutlineGroup";
import { SiGroupon } from "@react-icons/all-files/si/SiGroupon";
import { getUserGroups } from "../../App/Features/Admin/adminSlice";
import { ENDPOINT } from "../Helper/helper";
import socketIOClient from "socket.io-client";
import { message } from "antd";

// connection socket
const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });

function DashboardSideBarComponent() {
   const [cookies, setCookie, removeCookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);
   const { employeesGroup } = useSelector((state) => state.admin);

   const logOutHandler = function () {
      removeCookie("_ijp_at_user");
      dispatch(logOutUser({ data: null }));
   };

   useEffect(() => {
      if (!!cookies && cookies?._ijp_at_user && cookies?._ijp_at_user?.token) {
         if (cookies?._ijp_at_user?.role === "admin") {
            dispatch(getUserGroups({ token: cookies?._ijp_at_user?.token }));
         }
      }
   }, []);

   useEffect(() => {
      if (!!cookies && cookies?._ijp_at_user && cookies?._ijp_at_user?.token) {
         socket.on("_group_created_broadCast", (args) => {
            if (args.groupEmployeesIds.includes(cookies?._ijp_at_user?._id)) {
               message.success(`${args.groupAdmin} add you in ${args.groupName} group`);
               socket.emit("_join_group", { groupName: args.groupName });
            }
         });
      }
   }, [socket]);

   return (
      <styled.div className="bg-dark">
         <UserProfileComponent />
         <SidebarTabComponent icon={<DiGhostSmall />} heading={"Dashboard"} dropIcon={true}>
            <SidebarInnerSmComponent icon={<BsBag />} active={false} link={"/"} heading={"job"} />
            {!!user && user?.userObject && user?.userObject?.role === "admin" ? (
               <>
                  <SidebarInnerSmComponent
                     icon={<AiOutlineFileZip />}
                     link={"/applications"}
                     heading={"Applications"}
                  />
                  <SidebarInnerSmComponent
                     icon={<RiUserSettingsLine />}
                     link={"/all-users"}
                     heading={"All users"}
                  />
                  <SidebarInnerSmComponent
                     icon={<MdPlaylistAdd />}
                     link={"/groups"}
                     heading={"Groups"}
                  />
               </>
            ) : null}
            {!!user ? (
               <SidebarInnerSmComponent
                  icon={<IoIosLogOut />}
                  heading={"log out"}
                  onClick={logOutHandler}
                  link={"/portal/signin"}
               />
            ) : null}
         </SidebarTabComponent>
         {!!employeesGroup && employeesGroup?.success ? (
            <SidebarTabComponent icon={<AiOutlineGroup />} heading={"Groups"} dropIcon={true}>
               {!!employeesGroup?.groupInfo &&
                  employeesGroup?.groupInfo.map((el) => (
                     <SidebarTabComponent
                        dropIcon={false}
                        icon={<SiGroupon />}
                        heading={el.groupData?.groupName}
                     >
                        {/* {!!el?.groupData?.groupUsers && el?.groupData?.groupUsers.length
                           ? el?.groupData?.groupUsers.map((elm) => (
                                <SidebarInnerSmComponent
                                   profileDiv={true}
                                   key={elm._id}
                                   data={elm}
                                   heading={elm.userName}
                                />
                             ))
                           : null} */}
                     </SidebarTabComponent>
                  ))}
            </SidebarTabComponent>
         ) : null}
      </styled.div>
   );
}

export default DashboardSideBarComponent;
