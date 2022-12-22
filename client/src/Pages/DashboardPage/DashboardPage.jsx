import React from "react";
import * as styled from "./DashboardPage.style";
import DashboardSideBarComponent from "../../Components/DashboardSideBarComponent/DashboardSideBarComponent";
import { Outlet } from "react-router";

function DashboardPage() {
   return (
      <styled.div>
         <div className="container-fluid px-0">
            <div className="row gx-0">
               <div className="d-flex">
                  <DashboardSideBarComponent />
                  <styled.renderDiv>
                     <Outlet />
                  </styled.renderDiv>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default DashboardPage;
