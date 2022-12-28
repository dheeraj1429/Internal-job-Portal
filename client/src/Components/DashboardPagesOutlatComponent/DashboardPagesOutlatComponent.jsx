import React from "react";
import { Outlet } from "react-router";

function DashboardPagesOutlatComponent() {
   return (
      <div className="h-100">
         <Outlet />
      </div>
   );
}

export default DashboardPagesOutlatComponent;
