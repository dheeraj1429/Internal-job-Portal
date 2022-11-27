import React from 'react';
import * as styled from './JobApplyFormPage.style';
import { Outlet } from 'react-router';
import JobDetailsPrevComponent from '../../Components/JobDetailsPrevComponent/JobDetailsPrevComponent';

function JobApplyFormPage() {
   return (
      <styled.div>
         <div className="container py-5">
            <div className="row">
               <div className=" mb-4 mb-md-0 col-12 col-sm-12 col-md-6 col-lg-6 col-xxl-7">
                  <Outlet />
               </div>
               <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xxl-5">
                  <JobDetailsPrevComponent />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default JobApplyFormPage;
