import React, { useEffect } from 'react';
import { getSingleJobPost } from '../../App/Features/index/indexSlice';
import * as styled from './JobDetailsPrevComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import SpennerComponent from '../../HelperComponents/SpennerComponent/SpennerComponent';
import { BiRupee } from '@react-icons/all-files/bi/BiRupee';

function JobDetailsPrevComponent() {
   const dispatch = useDispatch();
   const params = useParams();

   const { singleJobPost, singleJobPostFetchLoading, singleJobPostFetchError } = useSelector(
      (state) => state.index
   );

   useEffect(() => {
      dispatch(getSingleJobPost({ postId: params?.id }));
   }, []);

   return (
      <styled.div className="shadow">
         {singleJobPostFetchLoading ? (
            <div className=" py-5 flex items-center justify-center">
               <SpennerComponent />
            </div>
         ) : !singleJobPostFetchError &&
           !!singleJobPost &&
           singleJobPost?.success &&
           singleJobPost?.post ? (
            <>
               <h5 className="mb-3">{singleJobPost.post.jobTitle}</h5>
               <hr />
               <div className="mt-4">
                  <div className=" text-gray-700 flex items-center">
                     <div className="tag_div w-25">
                        <p>Salary</p>
                     </div>
                     <BiRupee />
                     <span className=" text-gray-500">
                        {singleJobPost.post.salaryRangeStart} - {singleJobPost.post.salaryRangeEnd}
                     </span>
                  </div>
                  <div className=" text-gray-700 mt-1 flex items-center">
                     <div className="tag_div w-25">
                        <p>Job type</p>
                     </div>
                     <span className=" text-gray-500">{singleJobPost.post.jobType}</span>
                  </div>
                  <div className=" text-gray-700 mt-1 flex items-center">
                     <div className="tag_div w-25">
                        <p>Category</p>
                     </div>
                     <span className=" text-gray-500">{singleJobPost.post.jobCategory}</span>
                  </div>
                  <p className=" text-gray-500 mt-2">{singleJobPost.post.positionDescription}</p>
               </div>
            </>
         ) : !!singleJobPostFetchError ? (
            <p>{singleJobPostFetchError}</p>
         ) : null}
      </styled.div>
   );
}

export default JobDetailsPrevComponent;
