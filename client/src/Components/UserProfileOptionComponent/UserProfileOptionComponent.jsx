import React from 'react';
import * as styled from './UserProfileOptionComponent.style';
import ProfileInnerSmComponent from '../ProfileInnerSmComponent/ProfileInnerSmComponent';
import { VscAccount } from '@react-icons/all-files/vsc/VscAccount';
import { GrContactInfo } from '@react-icons/all-files/gr/GrContactInfo';
import { AiOutlineFilePdf } from '@react-icons/all-files/ai/AiOutlineFilePdf';

function UserProfileOptionComponent({ show, onClick }) {
   return (
      <styled.div show={show} onClick={onClick} className="shadow">
         <div className="overFlow_div"></div>
         <ProfileInnerSmComponent icon={<VscAccount />} heading={'My Account'} />
         <ProfileInnerSmComponent icon={<GrContactInfo />} heading={'Contact'} />
         <ProfileInnerSmComponent icon={<AiOutlineFilePdf />} heading={'resume'} />
      </styled.div>
   );
}

export default UserProfileOptionComponent;
