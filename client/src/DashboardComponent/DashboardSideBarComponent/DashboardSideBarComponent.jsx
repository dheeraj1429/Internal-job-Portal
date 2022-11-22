import React from 'react';
import * as styled from './DashboardSideBarComponent.style';
import SidebarInnerSmComponent from '../SidebarInnerSmComponent/SidebarInnerSmComponent';
import { AiOutlineAppstoreAdd } from '@react-icons/all-files/ai/AiOutlineAppstoreAdd';
import { BsBag } from '@react-icons/all-files/bs/BsBag';
import { AiOutlineBars } from '@react-icons/all-files/ai/AiOutlineBars';
import { RiUserSearchLine } from '@react-icons/all-files/ri/RiUserSearchLine';

function DashboardSideBarComponent() {
   return (
      <styled.div>
         <SidebarInnerSmComponent icon={<AiOutlineBars />} cl={'pt-2 pb-5'} />
         <SidebarInnerSmComponent icon={<AiOutlineAppstoreAdd />} active={false} link={'dashboard'} />
         <SidebarInnerSmComponent icon={<BsBag />} active={false} link={'job'} />
         <SidebarInnerSmComponent icon={<RiUserSearchLine />} active={false} link={'users'} />
      </styled.div>
   );
}

export default DashboardSideBarComponent;
