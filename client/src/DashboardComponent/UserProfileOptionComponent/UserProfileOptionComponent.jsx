import React from 'react';
import * as styled from './UserProfileOptionComponent.style';
import ProfileInnerSmComponent from '../ProfileInnerSmComponent/ProfileInnerSmComponent';
import { VscAccount } from '@react-icons/all-files/vsc/VscAccount';

function UserProfileOptionComponent({ show, onClick }) {
   return (
      <styled.div show={show} onClick={onClick}>
         <div className="overFlow_div"></div>
         <ProfileInnerSmComponent icon={<VscAccount />} heading={'My Account'} />
      </styled.div>
   );
}

export default UserProfileOptionComponent;
