import React, { useState, useContext, useEffect } from "react";
import * as styled from "./GroupNotificationComponent.style";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import UserNotificationComponent from "../UserNotificationComponent/UserNotificationComponent";
import { SocketContext } from "../../Context/socket";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../../App/Features/Admin/adminSlice";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";

function GroupNotificationComponent() {
   const [Notifications, setNotifications] = useState([]);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const [LoadingMessages, setLoadingMessages] = useState(false);
   const socket = useContext(SocketContext);
   const dispatch = useDispatch();
   const { pinnedNotifications, pinnedNotificationsFetchLoading, pinnedNotificationsFetchError } =
      useSelector((state) => state.admin);

   const UserPinnedMessagesHandler = function (args) {
      setNotifications((prevState) => [args, ...prevState]);
   };

   const MessageLoadingHandler = function (args) {
      setLoadingMessages(args.messageLoading);
   };

   useEffect(() => {
      if (cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.role === "admin") {
         socket.on("_pinned_messages", UserPinnedMessagesHandler);
         socket.on("_loading_message", MessageLoadingHandler);

         dispatch(getAllNotifications({ token: cookie?._ijp_at_user?.token }));
      }

      return () => socket.off("_pinned_messages", UserPinnedMessagesHandler);
   }, []);

   return (
      <styled.div>
         <HeadingComponent heading={"Notification"} />
         {pinnedNotificationsFetchLoading ? <SpennerComponent /> : null}
         {!!pinnedNotificationsFetchError ? (
            <p className="error_text">{pinnedNotificationsFetchError}</p>
         ) : null}
         <div className="mt-4">
            {LoadingMessages ? (
               <div className="messageLoading_div">
                  <img src="/images/message_loading.svg" alt="" />
               </div>
            ) : null}
            {!!Notifications && Notifications?.length
               ? Notifications.map((el) => (
                    <UserNotificationComponent data={el} key={el.messageId} />
                 ))
               : null}
            {!!pinnedNotifications &&
            pinnedNotifications?.success &&
            pinnedNotifications?.notifications.length
               ? pinnedNotifications.notifications.map((el) => (
                    <UserNotificationComponent data={el} key={el.messageId} />
                 ))
               : null}
            {!Notifications?.length &&
            !!pinnedNotifications &&
            pinnedNotifications?.success &&
            !pinnedNotifications?.notifications.length ? (
               <p className="text-gray-500 text-sm">No notifications</p>
            ) : null}
         </div>
      </styled.div>
   );
}

export default GroupNotificationComponent;
