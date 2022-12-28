import React from "react";
import * as styled from "./ChatContainerComponent.style";
import ChatBoxComponent from "../ChatBoxComponent/ChatBoxComponent";
import ChatPreviewComponent from "../ChatPreviewComponent/ChatPreviewComponent";
import { useCookies } from "react-cookie";

function ChatContainerComponent() {
   const [cookie] = useCookies(["_ijp_at_user"]);

   return (
      <styled.div>
         {!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.role === "admin" ? (
            <ChatPreviewComponent />
         ) : (
            <ChatBoxComponent />
         )}
      </styled.div>
   );
}

export default ChatContainerComponent;
