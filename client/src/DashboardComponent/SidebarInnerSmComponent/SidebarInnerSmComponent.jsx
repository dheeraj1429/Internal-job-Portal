import React from 'react';
import { Link } from 'react-router-dom';
import * as styled from './SidebarInnerSmComponent.style';

function SidebarInnerSmComponent({ icon, cl, active, link }) {
   return (
      <Link to={link}>
         <styled.div className={`d-flex align-items-center ${cl ? cl : null}`} active={active}>
            {icon}
         </styled.div>
      </Link>
   );
}

export default React.memo(SidebarInnerSmComponent);
