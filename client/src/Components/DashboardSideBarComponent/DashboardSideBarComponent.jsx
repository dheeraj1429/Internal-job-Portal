import React from 'react';
import * as styled from './DashboardSideBarComponent.style';
import SidebarInnerSmComponent from '../SidebarInnerSmComponent/SidebarInnerSmComponent';
import { BsBag } from '@react-icons/all-files/bs/BsBag';
import UserProfileComponent from '../../HelperComponents/UserProfileComponent/UserProfileComponent';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { useCookies } from 'react-cookie';
import { logOutUser } from '../../App/Features/Auth/AuthSlice';
import { AiOutlineFileZip } from '@react-icons/all-files/ai/AiOutlineFileZip';
import { RiUserSettingsLine } from '@react-icons/all-files/ri/RiUserSettingsLine';

function DashboardSideBarComponent() {
   const [cookies, setCookie, removeCookie] = useCookies(['user']);
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);

   const logOutHandler = function () {
      removeCookie('user');
      dispatch(logOutUser({ data: null }));
   };

   return (
      <styled.div>
         <UserProfileComponent />
         <SidebarInnerSmComponent icon={<BsBag />} active={false} link={'/'} heading={'job'} />
         {!!user && user?.userObject && user?.userObject?.role === 'admin' ? (
            <>
               <SidebarInnerSmComponent
                  icon={<AiOutlineFileZip />}
                  link={'/applications'}
                  heading={'Applications'}
               />
               <SidebarInnerSmComponent
                  icon={<RiUserSettingsLine />}
                  link={'/all-users'}
                  heading={'All users'}
               />
            </>
         ) : null}
         {!!user ? (
            <SidebarInnerSmComponent
               icon={<IoIosLogOut />}
               heading={'log out'}
               onClick={logOutHandler}
               link={'/portal/signin'}
            />
         ) : null}
      </styled.div>
   );
}

export default DashboardSideBarComponent;
