import React from 'react';
import * as styled from './DashboardSideBarComponent.style';
import SidebarInnerSmComponent from '../SidebarInnerSmComponent/SidebarInnerSmComponent';
import { BsBag } from '@react-icons/all-files/bs/BsBag';
import UserProfileComponent from '../../HelperComponents/UserProfileComponent/UserProfileComponent';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { useCookies } from 'react-cookie';
import { logOutUser } from '../../App/Features/Auth/AuthSlice';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { AiOutlineFileZip } from '@react-icons/all-files/ai/AiOutlineFileZip';

function DashboardSideBarComponent() {
   const [cookies, setCookie, removeCookie] = useCookies(['user']);
   const dispatch = useDispatch();
   const location = useLocation();
   const { user } = useSelector((state) => state.auth);
   const navigation = useNavigate();

   const logOutHandler = function () {
      removeCookie('user');
      dispatch(logOutUser({ data: null }));
      dispatch(navigation('/'));
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
            </>
         ) : null}
         {!!user ? (
            <SidebarInnerSmComponent
               icon={<IoIosLogOut />}
               heading={'log out'}
               onClick={logOutHandler}
            />
         ) : null}
      </styled.div>
   );
}

export default DashboardSideBarComponent;
