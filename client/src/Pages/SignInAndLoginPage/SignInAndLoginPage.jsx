import React from 'react';
import * as styled from './SignInAndLoginPage.style';
import { Outlet } from 'react-router';

function SignInAndLoginPage() {
   return (
      <styled.div>
         <styled.formDiv>
            <div className="container-fluid p-0">
               <div className="row gx-0">
                  <div className="col-12 col-sm-12 col-md-5">
                     <div className="imag_div"></div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-7 py-5 px-5">
                     <Outlet />
                  </div>
               </div>
            </div>
         </styled.formDiv>
      </styled.div>
   );
}

export default SignInAndLoginPage;
