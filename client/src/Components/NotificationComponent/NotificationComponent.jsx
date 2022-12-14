import React from "react";
import * as styled from "./NotificationComponent.style";
import ReactDOM from "react-dom";
import { FcComments } from "@react-icons/all-files/fc/FcComments";

function NotificationComponent() {
   return ReactDOM.createPortal(
      <styled.div className="shadow flex items-center bg-green-100 rounded">
         <FcComments />
         <p className="ms-2 text-sm">You added in Kedaa group</p>
      </styled.div>,
      document.getElementById("notification")
   );
}

export default NotificationComponent;
