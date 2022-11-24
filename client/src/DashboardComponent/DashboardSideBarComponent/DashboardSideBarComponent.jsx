import React, { useState } from 'react';
import * as styled from './DashboardSideBarComponent.style';
import SidebarInnerSmComponent from '../SidebarInnerSmComponent/SidebarInnerSmComponent';
import { AiOutlineAppstoreAdd } from '@react-icons/all-files/ai/AiOutlineAppstoreAdd';
import { BsBag } from '@react-icons/all-files/bs/BsBag';
import { RiUserSearchLine } from '@react-icons/all-files/ri/RiUserSearchLine';
import UserProfileComponent from '../../Components/UserProfileComponent/UserProfileComponent';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { useCookies } from 'react-cookie';
import { logOutUser } from '../../App/Features/Auth/AuthSlice';

function DashboardSideBarComponent() {
   const [ActiveBar, setActiveBar] = useState('Dashboard');
   const [cookies, setCookie, removeCookie] = useCookies(['user']);
   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);

   const ActiveHandler = function (type) {
      setActiveBar(type);
   };

   const logOutHandler = function () {
      removeCookie('user');
      dispatch(logOutUser(null));
   };

   return (
      <styled.div>
         <UserProfileComponent />
         {!!user && user?.userObject && user?.userObject?.role === 'admin' ? (
            <SidebarInnerSmComponent
               icon={<AiOutlineAppstoreAdd />}
               active={false}
               link={'/'}
               heading={'Dashboard'}
               ActiveBar={ActiveBar}
               onClick={ActiveHandler}
            />
         ) : null}
         <SidebarInnerSmComponent
            icon={<BsBag />}
            ActiveBar={ActiveBar}
            active={false}
            link={'job'}
            heading={'job'}
            onClick={ActiveHandler}
         />
         {!!user ? (
            <SidebarInnerSmComponent
               icon={<IoIosLogOut />}
               ActiveBar={ActiveBar}
               active={false}
               heading={'log out'}
               onClick={logOutHandler}
            />
         ) : null}
         {!!user && user?.userObject?.role === 'admin' ? (
            <SidebarInnerSmComponent
               icon={<RiUserSearchLine />}
               active={false}
               link={'users'}
               heading={'All Users'}
               ActiveBar={ActiveBar}
               onClick={ActiveHandler}
            />
         ) : null}
      </styled.div>
   );
}

export default DashboardSideBarComponent;
