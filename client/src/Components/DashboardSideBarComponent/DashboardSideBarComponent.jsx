import React from 'react';
import * as styled from './DashboardSideBarComponent.style';
import SidebarInnerSmComponent from '../SidebarInnerSmComponent/SidebarInnerSmComponent';
import { AiOutlineAppstoreAdd } from '@react-icons/all-files/ai/AiOutlineAppstoreAdd';
import { BsBag } from '@react-icons/all-files/bs/BsBag';
import { RiUserSearchLine } from '@react-icons/all-files/ri/RiUserSearchLine';
import UserProfileComponent from '../../HelperComponents/UserProfileComponent/UserProfileComponent';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { useCookies } from 'react-cookie';
import { logOutUser } from '../../App/Features/Auth/AuthSlice';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

function DashboardSideBarComponent() {
   const [cookies, setCookie, removeCookie] = useCookies(['user']);
   const dispatch = useDispatch();
   const location = useLocation();
   const { user } = useSelector((state) => state.auth);
   const navigation = useNavigate();

   const logOutHandler = function () {
      removeCookie('user');
      dispatch(logOutUser(null));
      dispatch(navigation('/'));
   };

   return (
      <styled.div>
         <UserProfileComponent />

         <SidebarInnerSmComponent icon={<BsBag />} active={false} link={'/'} heading={'job'} />
         {!!user && user?.userObject && user?.userObject?.role === 'admin' ? (
            <SidebarInnerSmComponent
               icon={<AiOutlineAppstoreAdd />}
               link={'/Dashboard'}
               heading={'Dashboard'}
            />
         ) : null}
         {!!user ? (
            <SidebarInnerSmComponent
               icon={<IoIosLogOut />}
               heading={'log out'}
               onClick={logOutHandler}
            />
         ) : null}
         {!!user && user?.userObject?.role === 'admin' ? (
            <SidebarInnerSmComponent
               icon={<RiUserSearchLine />}
               link={'users'}
               heading={'All Users'}
            />
         ) : null}
      </styled.div>
   );
}

export default DashboardSideBarComponent;
