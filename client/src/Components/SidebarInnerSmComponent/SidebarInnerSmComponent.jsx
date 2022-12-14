import React from "react";
import { Link } from "react-router-dom";
import * as styled from "./SidebarInnerSmComponent.style";

function SidebarInnerSmComponent({ icon, cl, link, heading, onClick, profileDiv, data }) {
   return (
      <Link to={link}>
         <div
            className="flex items-center justify-center justify-content-lg-start"
            onClick={onClick ? () => onClick() : null}
         >
            <styled.div className={`d-flex align-items-center ${cl ? cl : null}`}>
               {icon}
               {profileDiv ? (
                  <div className="user_Profile shadow">
                     <img
                        src={!!data ? `/usersProfileCompress/${data.userProfile}` : null}
                        alt=""
                     />
                  </div>
               ) : null}
            </styled.div>
            <p className=" text-white d-lg-block d-none text-sm">{heading}</p>
         </div>
      </Link>
   );
}

export default React.memo(SidebarInnerSmComponent);
