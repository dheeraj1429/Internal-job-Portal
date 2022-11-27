import React from 'react';
import * as styled from './ProfileInnerSmComponent.style';
import { Link } from 'react-router-dom';

function ProfileInnerSmComponent({ icon, heading }) {
   return (
      <Link to={`/${heading.toLowerCase().replaceAll(' ', '-')}`}>
         <styled.div className="flex items-center">
            <div className="csvDiv">{icon}</div>
            <p>{heading}</p>
         </styled.div>
      </Link>
   );
}

export default ProfileInnerSmComponent;
