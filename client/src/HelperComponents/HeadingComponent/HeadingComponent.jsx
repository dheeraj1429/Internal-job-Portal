import React from 'react';
import * as styled from './HeadingComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HeadingComponent({ heading, subHeading, btn }) {
   const { user } = useSelector((state) => state.auth);

   return (
      <styled.div>
         <div className="flex items-center justify-between">
            <h1>{heading}</h1>
            {!!btn && !!user && !!user?.userObject && user?.userObject?.role === 'admin' ? (
               <Link to={'/job/create'}>
                  <CustomButtonComponent innerText={'Create'} btnCl={'category_upload mb-2'} />
               </Link>
            ) : !!btn && !user ? (
               <Link to={'/portal/signin'}>
                  <CustomButtonComponent innerText={'Sign in'} btnCl={'category_upload mb-2'} />
               </Link>
            ) : null}
         </div>
         {!!subHeading ? <p className=" text-gray-500">{subHeading}</p> : null}
      </styled.div>
   );
}

export default HeadingComponent;
