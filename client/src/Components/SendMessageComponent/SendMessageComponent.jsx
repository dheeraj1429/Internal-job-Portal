import React, { useContext, useState } from "react";
import * as styled from "./SendMessageComponent.style";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { SocketContext } from "../../Context/socket";
import { message } from "antd";
import InputEmoji from "react-input-emoji";

function SendMessageComponent() {
   const [Message, setMessage] = useState("");
   const socket = useContext(SocketContext);
   const params = useParams();
   const [cookie] = useCookies(["_ijp_at_user"]);

   const SendMessageHandler = function () {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (Message) {
            socket.emit("_send_group_message", {
               groupName: params?.name,
               groupId: params?.id,
               message: Message,
               userInfo: {
                  name: cookie?._ijp_at_user?.name,
                  profilePic: cookie?._ijp_at_user?.profilePic,
                  _id: cookie?._ijp_at_user._id,
               },
            });
            setMessage("");
         } else {
            message.error("Please enter your message");
         }
      }
   };

   return (
      <styled.div className="flex items-center">
         <InputEmoji value={Message} onChange={setMessage} cleanOnEnter onEnter={SendMessageHandler} placeholder="Send message" />
      </styled.div>
   );
}

export default React.memo(SendMessageComponent);
