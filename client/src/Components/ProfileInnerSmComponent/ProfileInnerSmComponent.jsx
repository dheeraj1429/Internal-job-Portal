import React from "react";
import * as styled from "./ProfileInnerSmComponent.style";
import { Link } from "react-router-dom";

function ProfileInnerSmComponent({ icon, heading }) {
   const HideAndShowSideMiniBar = function () {
      if (window.innerWidth >= 600) {
         return;
      } else {
         document.querySelector(".sidebarOverDiv").classList.toggle("Mini_sidebar");
      }
   };

   return (
      <Link to={`/${heading.toLowerCase().replaceAll(" ", "-")}`}>
         <styled.div className="flex items-center" onClick={HideAndShowSideMiniBar}>
            <div className="csvDiv">{icon}</div>
            <p>{heading}</p>
         </styled.div>
      </Link>
   );
}

export default ProfileInnerSmComponent;
