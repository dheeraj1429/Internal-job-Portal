import React, { useEffect, useState, useContext } from "react";
import * as styled from "./ChatBoxComponent.style";
import UserProfileAndMessageComponent from "../UserProfileAndMessageComponent/UserProfileAndMessageComponent";
import SendMessageComponent from "../SendMessageComponent/SendMessageComponent";
import { SocketContext } from "../../Context/socket";
import { useCookies } from "react-cookie";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatBoxComponent() {
   const [cookies] = useCookies(["_ijp_at_user"]);
   const [UserReciveMessage, setUserReciveMessage] = useState([]);
   const socket = useContext(SocketContext);

   useEffect(() => {
      socket.on("_receive_message", (args) => {
         setUserReciveMessage((prevState) => [...prevState, args]);
         Screen.current?.scrollIntoView({ behavior: "smooth" });
      });
   }, []);

   return (
      <styled.div>
         <div className="chatBox px-5">
            <ScrollToBottom className="scroll">
               {!!cookies && cookies?._ijp_at_user && UserReciveMessage.length
                  ? UserReciveMessage.map((el) => (
                       <UserProfileAndMessageComponent
                          pos={cookies?._ijp_at_user?._id === el?.userInfo?._id ? "end" : "start"}
                          key={el?._sender_message_id || el?._reciver_message_id}
                          messageCl={
                             cookies?._ijp_at_user?._id === el?.userInfo?._id ? "bg-sky-400" : null
                          }
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
