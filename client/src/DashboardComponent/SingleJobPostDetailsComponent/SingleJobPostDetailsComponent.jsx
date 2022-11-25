import React, { useEffect } from 'react';
import * as styled from './SingleJobPostDetailsComponent.style';
import { useParams } from 'react-router';
import { getSingleJobPost } from '../../App/Features/index/indexSlice';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import SpennerComponent from '../../Components/SpennerComponent/SpennerComponent';
import { BiRupee } from '@react-icons/all-files/bi/BiRupee';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function SingleJobPostDetailsComponent() {
   const params = useParams();
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { singleJobPost, singleJobPostFetchLoading, singleJobPostFetchError } = useSelector(
      (state) => state.index
   );
   const { user } = useSelector((state) => state.auth);

   const ApplyHandler = function () {
      if (!user) {
         return navigation('/portal/signin');
      }
   };

   useEffect(() => {
      dispatch(getSingleJobPost({ postId: params?.id }));
   }, []);

   return (
      <styled.div>
         {!!singleJobPostFetchLoading ? (
            <SpennerComponent center={true} />
         ) : !singleJobPostFetchError &&
           !!singleJobPost &&
           singleJobPost.success &&
           singleJobPost?.post ? (
            <div className="pb-4">
               <h1 className="mb-2">{singleJobPost.post.jobTitle}</h1>
               <hr />
               <div className="mt-3 flex items-center">
                  <div className="flexDiv">
                     <p>Job type</p>
                  </div>
                  <p className=" text-gray-600">{singleJobPost.post.jobType}</p>
               </div>
               <div className="mt-2 flex items-center">
                  <div className="flexDiv">
                     <p>Job category</p>
                  </div>
                  <p className=" text-gray-600">{singleJobPost.post.jobCategory}</p>
               </div>
               <div className="mt-2 flex items-center">
                  <div className="flexDiv">
                     <p>Salary range</p>
                  </div>
                  <p className=" text-gray-600 flex items-center">
                     <BiRupee />
                     {singleJobPost.post.salaryRangeStart} - {singleJobPost.post.salaryRangeEnd}
                  </p>
               </div>

               <h4 className="mt-4">
                  <strong>Position desription</strong>
               </h4>
               <p className="mt-2 text-gray-700">{singleJobPost.post.positionDescription}</p>
               <h4 className="mt-4 mb-2">
                  <strong>Job description</strong>
               </h4>
               <div
                  contentEditable="false"
                  dangerouslySetInnerHTML={{
                     __html: DOMPurify.sanitize(singleJobPost.post.metaData),
                  }}
               ></div>
               {!!user && user?.userObject && user?.userObject.role === 'admin' ? (
                  <Link to={`/job/edit/${singleJobPost.post._id}`}>
                     <CustomButtonComponent innerText={'Edit'} btnCl={'category_upload'} />
                  </Link>
               ) : (
                  <CustomButtonComponent
                     onClick={ApplyHandler}
                     innerText={'Apply'}
                     btnCl={'category_upload'}
                  />
               )}
            </div>
         ) : !!singleJobPostFetchError ? (
            <div>
               <p className=" text-red-500">{singleJobPostFetchError}</p>
            </div>
         ) : null}
      </styled.div>
   );
}

export default SingleJobPostDetailsComponent;
