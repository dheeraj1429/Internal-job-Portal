import React, { useContext, useState } from "react";
import * as styled from "./SendMessageComponent.style";
import { GrSend } from "@react-icons/all-files/gr/GrSend";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { SocketContext } from "../../Context/socket";
import { message } from "antd";

function SendMessageComponent({ onClick }) {
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
      <styled.div>
         <div className="input_div_div border rounded-lg">
            <input
               type="text"
               onChange={(e) => setMessage(e.target.value)}
               value={Message}
               name="message"
               placeholder="Send message"
            />
            <div className="icon_div hover:bg-sky-100" onClick={SendMessageHandler}>
               <GrSend />
            </div>
         </div>
      </styled.div>
   );
}

export default React.memo(SendMessageComponent);
