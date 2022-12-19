import React, { useEffect, useState, useContext } from "react";
import * as styled from "./ChatBoxComponent.style";
import UserProfileAndMessageComponent from "../UserProfileAndMessageComponent/UserProfileAndMessageComponent";
import SendMessageComponent from "../SendMessageComponent/SendMessageComponent";
import { SocketContext } from "../../Context/socket";
import { useCookies } from "react-cookie";
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch, useSelector } from "react-redux";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import { fetchGroupChats } from "../../App/Features/Group/groupSlice";
import { useParams } from "react-router";

function ChatBoxComponent() {
   const [cookies] = useCookies(["_ijp_at_user"]);
   const [UserReciveMessage, setUserReciveMessage] = useState([]);
   const socket = useContext(SocketContext);
   const [Page, setPage] = useState(0);

   const { groupChats, groupChatsFetchError, groupChatsFetchLoading } = useSelector((state) => state.group);
   const dispatch = useDispatch();
   const params = useParams();

   const PreviewMessagesHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   useEffect(() => {
      console.log(params.id);
   }, []);

   useEffect(() => {
      if (groupChats && groupChats?.messages && groupChats?.messages.length && groupChats?.messages[0]?.groupMessages) {
         setUserReciveMessage((prevState) => [...groupChats.messages[0].groupMessages, ...prevState]);
      }
   }, [groupChats]);

   useEffect(() => {
      if (Page) {
         if (!!cookies && cookies?._ijp_at_user && cookies?._ijp_at_user?.token) {
            dispatch(fetchGroupChats({ token: cookies?._ijp_at_user?.token, groupId: params?.id, page: Page }));
         }
      }
   }, [Page]);

   useEffect(() => {
      const listener = function (args) {
         if (args.groupId === params.id) {
            console.log(args);
            console.log(params.id);
            setUserReciveMessage((prevState) => [...prevState, args]);
            Screen.current?.scrollIntoView({ behavior: "smooth" });
         }
      };

      if (params?.id) {
         if (!!cookies && cookies?._ijp_at_user && cookies?._ijp_at_user?.token) {
            setUserReciveMessage([]);
            dispatch(fetchGroupChats({ token: cookies?._ijp_at_user?.token, groupId: params?.id, page: Page }));

            socket.on("_receive_message", listener);
         }
      }

      return () => {
         socket.off("_receive_message", listener);
         console.log("stop listingin");
      };
   }, [params?.id]);

   return (
      <styled.div className="bg-gray-100">
         <div className="chatBox">
            <ScrollToBottom className="scroll">
               {!!groupChats && groupChats?.messages && groupChats?.messages[0]?._id?.totalPages === Page + 1 ? null : groupChats?.messages.length ? (
                  <div className="flex items-center justify-center mb-3">
                     {groupChatsFetchLoading ? (
                        <SpennerComponent type={"white"} />
                     ) : (
                        <div className="olderMessage_div bg-sky-600 shadow" onClick={PreviewMessagesHandler}>
                           <p>Load older messages</p>
                        </div>
                     )}
                  </div>
               ) : null}
               {!!groupChatsFetchError ? <p className="text-sm error_text">{groupChatsFetchError}</p> : null}
               {!!cookies && cookies?._ijp_at_user && UserReciveMessage.length
                  ? UserReciveMessage.map((el) => (
                       <UserProfileAndMessageComponent
                          pos={cookies?._ijp_at_user?._id === el?.userInfo?._id ? "end" : "start"}
                          key={el?._sender_message_id || el?._id}
                          messageCl={cookies?._ijp_at_user?._id === el?.userInfo?._id ? "bg-sky-400 shadow" : null}
                          data={el}
                       />
                    ))
                  : null}
            </ScrollToBottom>
         </div>
         <SendMessageComponent />
      </styled.div>
   );
}

export default ChatBoxComponent;
