import React from 'react';
import { Link } from 'react-router-dom';
import * as styled from './SidebarInnerSmComponent.style';

function SidebarInnerSmComponent({ icon, cl, link, heading, ActiveBar, onClick }) {
   return (
      <Link to={link}>
         <div className="flex items-center" onClick={onClick ? () => onClick() : null}>
            <styled.div className={`d-flex align-items-center ${cl ? cl : null}`}>
               {icon}
            </styled.div>
            <p className=" text-white">{heading}</p>
         </div>
      </Link>
   );
}

export default React.memo(SidebarInnerSmComponent);
