import React, { useState } from "react";
import * as styled from "./SidebarTabComponent.style";
import { IoMdArrowDropright } from "@react-icons/all-files/io/IoMdArrowDropright";

function SidebarTabComponent({ children, icon, heading, dropIcon, HideAndShowMiniSidebar }) {
   const [ShowSubVariation, setShowSubVariation] = useState(false);

   const ShowHandler = function () {
      setShowSubVariation(!ShowSubVariation);
   };

   return (
      <styled.div show={ShowSubVariation}>
         <div
            className="flex items-center justify-between px-3 py-2"
            onClick={
               HideAndShowMiniSidebar
                  ? () => {
                       ShowHandler();
                       HideAndShowMiniSidebar();
                    }
                  : () => ShowHandler()
            }
         >
            <div className="flex items-center tab_icons">
               {icon}
               <p className="ms-2 text-sm text-gray-100">{heading}</p>
            </div>
            {!dropIcon ? null : (
               <IoMdArrowDropright className={ShowSubVariation ? "rotate_cl" : null} />
            )}
         </div>
         <div className="padding_side_bar inner_hidden_bar">{children}</div>
      </styled.div>
   );
}

export default SidebarTabComponent;
