import React from 'react';
import * as styled from './MyAccountPage.style';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MyAccountPage() {
   const { user } = useSelector((state) => state.auth);

   return (
      <styled.div>
         {!!user && user?.userObject ? (
            <div>
               <h1 className="banerHeading">{user.userObject.name}</h1>
               <p className="mt-3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. In corporis
                  exercitationem atque. Tenetur quos cumque sed, explicabo, laboriosam ipsum
                  distinctio doloremque quae vel ducimus voluptates quas animi itaque sit veniam
                  quia sunt nemo cupiditate sint, fugit voluptas amet. Accusamus, autem.
               </p>
               <div className="contact_info">
                  <Link to={'/contact'}>
                     <p className=" text-sky-800 mt-3">Add your contact information</p>
                  </Link>
               </div>
            </div>
         ) : null}
      </styled.div>
   );
}

export default MyAccountPage;
