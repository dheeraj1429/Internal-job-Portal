import React from "react";
import * as styled from "./InfoBoxComponent.style";
import InfoCartComponent from "../InfoCartComponent/InfoCartComponent";
import { useSelector } from "react-redux";

function InfoBoxComponent() {
   const { allJobs } = useSelector((state) => state.admin);

   return (
      <styled.div className="mt-4">
         <div className="container-fluid p-0">
            <div className="row">
               <div
                  className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4"
                  key={"/images/layers.svg"}
               >
                  <InfoCartComponent
                     imgSrc={"/images/layers.svg"}
                     smHeading={"Welcome to"}
                     secondHeading={"Mighty Warners pvt.ltd"}
                     active={true}
                  />
               </div>
               <div
                  className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4"
                  key={"/images/add.svg"}
               >
                  <InfoCartComponent
                     imgSrc={"/images/add.svg"}
                     smHeading={allJobs?.documents}
                     secondHeading={"Job Posted"}
                     active={false}
                     color={"--smooth-yellow-cl"}
                  />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default InfoBoxComponent;
