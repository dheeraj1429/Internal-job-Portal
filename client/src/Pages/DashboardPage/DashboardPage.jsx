import React, { useEffect, useContext } from "react";
import * as styled from "./DashboardPage.style";
import DashboardSideBarComponent from "../../Components/DashboardSideBarComponent/DashboardSideBarComponent";
import DashboardPagesOutlatComponent from "../../Components/DashboardPagesOutlatComponent/DashboardPagesOutlatComponent";
import { SocketContext } from "../../Context/socket";
import { useCookies } from "react-cookie";

function DashboardPage() {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies(["_ijp_at_user"]);

   useEffect(() => {
      if (cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         socket.emit("_store_user_info", {
            token: cookie?._ijp_at_user?.token,
            role: cookie?._ijp_at_user?.role,
         });
      }
   }, []);

   return (
      <styled.div>
         <div className="container-fluid px-0">
            <div className="row gx-0">
               <div className="d-flex">
                  <DashboardSideBarComponent />
                  <styled.renderDiv>
                     <DashboardPagesOutlatComponent />
                  </styled.renderDiv>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default DashboardPage;
