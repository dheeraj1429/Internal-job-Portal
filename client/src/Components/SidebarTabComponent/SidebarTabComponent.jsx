import React, { useState } from 'react';
import * as styled from './SidebarTabComponent.style';
import { IoMdArrowDropright } from '@react-icons/all-files/io/IoMdArrowDropright';

function SidebarTabComponent({ children, icon, heading }) {
   const [ShowSubVariation, setShowSubVariation] = useState(false);

   const ShowHandler = function () {
      setShowSubVariation(!ShowSubVariation);
   };

   return (
      <styled.div show={ShowSubVariation}>
         <div
            className="flex items-center justify-between px-3 py-2"
            onClick={ShowHandler}
         >
            <div className="flex items-center">
               {icon}
               <p className="text-white ms-2">{heading}</p>
            </div>
            <IoMdArrowDropright
               className={ShowSubVariation ? 'rotate_cl' : null}
            />
         </div>
         <div className="px-4">{children}</div>
      </styled.div>
   );
}

export default SidebarTabComponent;
