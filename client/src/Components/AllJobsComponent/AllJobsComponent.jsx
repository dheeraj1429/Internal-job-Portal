import React from "react";
import * as styled from "./AllJobsComponent.style";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import JobPostsCartListComponent from "../JobPostsCartListComponent/JobPostsCartListComponent";
import InfoBoxComponent from "../InfoBoxComponent/InfoBoxComponent";
import { useSelector } from "react-redux";

function AllJobsComponent() {
   const { user } = useSelector((state) => state.auth);

   return (
      <styled.div>
         <HeadingComponent
            btn={true}
            link={"/job/create"}
            heading={"Recent Job Posts"}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
         />
         {!!user && user?.userObject && user?.userObject?.role === "admin" ? (
            <InfoBoxComponent />
         ) : null}
         <div className="mt-2 mt-md-5">
            <JobPostsCartListComponent />
         </div>
      </styled.div>
   );
}

export default AllJobsComponent;
