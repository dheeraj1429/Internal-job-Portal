import React, { lazy, Suspense, useEffect } from "react";
import * as styled from "./JobPostsCartListComponent.style";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import { getAllJobPosts } from "../../App/Features/Admin/adminSlice";

const JobCartComponent = lazy(() => import("../JobCartComponent/JobCartComponent"));

function JobPostsCartListComponent() {
   const dispatch = useDispatch();
   const { allJobs, allJobsFetchLoading, allJobsFetchError } = useSelector((state) => state.admin);

   useEffect(() => {
      dispatch(getAllJobPosts());
   }, []);

   return (
      <styled.div>
         <div className="container-fluid">
            <div className="row">
               {!!allJobsFetchLoading ? (
                  <div className="col-12 flex items-center justify-center">
                     <SpennerComponent />
                  </div>
               ) : !allJobsFetchLoading &&
                 !allJobsFetchError &&
                 !!allJobs &&
                 allJobs?.success &&
                 !!allJobs?.allJobs.length ? (
                  allJobs.allJobs.map((el) => (
                     <div
                        key={el._id}
                        className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4"
                     >
                        <Suspense
                           fallback={
                              <Stack spacing={1}>
                                 <Skeleton variant="rounded" width={"100%"} height={300} />
                              </Stack>
                           }
                        >
                           <JobCartComponent data={el} />
                        </Suspense>
                     </div>
                  ))
               ) : !allJobsFetchLoading &&
                 !allJobsFetchError &&
                 !!allJobs &&
                 allJobs?.success &&
                 !allJobs?.allJobs.length ? (
                  <div className="col-12">
                     <p>No Jobs posted</p>
                  </div>
               ) : !!allJobsFetchError ? (
                  <p className=" text-red-500">{allJobsFetchError}</p>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default JobPostsCartListComponent;
