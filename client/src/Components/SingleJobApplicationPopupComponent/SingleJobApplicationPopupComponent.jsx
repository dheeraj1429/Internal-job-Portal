import React, { useEffect } from 'react';
import * as styled from './SingleJobApplicationPopupComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import SpennerComponent from '../../HelperComponents/SpennerComponent/SpennerComponent';
import { getSingleJobApplication } from '../../App/Features/Admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiRupee } from '@react-icons/all-files/bi/BiRupee';
import ListComponent from '../ListComponent/ListComponent';

function SingleJobApplicationPopupComponent({ show, CloseHandler }) {
   const dispatch = useDispatch();

   const {
      singleJobApplication,
      singleJobApplicationFetchLoading,
      singleJobApplicationFetchError,
   } = useSelector((state) => state.admin);

   useEffect(() => {
      if (!!show?.jobId && !!show?.token) {
         dispatch(getSingleJobApplication({ token: show?.token, jobId: show?.jobId }));
      }
   }, [show.jobId]);

   return ReactDOM.createPortal(
      <styled.div show={show?.show}>
         <div className="mainDiv px-4 py-3" show={show?.show}>
            <div className="closeBtnDiv">
               <VscClose onClick={CloseHandler} />
            </div>
            {!!singleJobApplicationFetchLoading ? (
               <div className="w-full h-full flex items-center justify-center">
                  <SpennerComponent />
               </div>
            ) : null}
            {!!singleJobApplication &&
            singleJobApplication?.success &&
            singleJobApplication?.applications ? (
               <>
                  <h1>{singleJobApplication?.applications[0]?.jobApplied.jobTitle}</h1>
                  <p className=" text-gray-600 text-sm mt-2">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quam neque
                     accusamus dolor cupiditate voluptates assumenda doloribus cumque. Possimus,
                     consectetur.
                  </p>
                  <ListComponent
                     heading={'Job type'}
                     subHeading={singleJobApplication?.applications[0]?.jobApplied.jobType}
                  />
                  <ListComponent
                     heading={'Job Category'}
                     subHeading={singleJobApplication?.applications[0]?.jobApplied.jobCategory}
                  />
                  <ListComponent
                     heading={'Salary'}
                     subHeading={singleJobApplication?.applications[0]?.jobApplied.salaryRangeStart}
                     subHeadingSecond={
                        singleJobApplication?.applications[0]?.jobApplied.salaryRangeEnd
                     }
                     icon={<BiRupee />}
                  />
                  <hr className="mt-3 mb-3" />
                  <div className=" flex mb-3">
                     <div className="user_Profile_div">
                        <img
                           src={`/usersProfileCompress/${singleJobApplication?.applications[0]?.user?.userProfile}`}
                           alt=""
                        />
                     </div>
                     <div className="ms-2">
                        <h5>{singleJobApplication?.applications[0]?.user?.name}</h5>
                        <p className=" text-sm text-sky-500 mt-1">
                           {singleJobApplication?.applications[0]?.user?.email}
                        </p>
                     </div>
                  </div>
                  <ListComponent
                     heading={'City'}
                     subHeading={singleJobApplication?.applications[0]?.user.cityState}
                  />
                  <ListComponent
                     heading={'Street'}
                     subHeading={singleJobApplication?.applications[0]?.user.street}
                  />
                  <ListComponent
                     heading={'Career Level'}
                     subHeading={singleJobApplication?.applications[0]?.user.careerLevel}
                  />
                  <ListComponent
                     heading={'Reference'}
                     subHeading={
                        !!singleJobApplication?.applications[0]?.reference ? 'Yes' : 'No reference'
                     }
                  />
                  {!!singleJobApplication?.applications[0]?.reference ? (
                     <>
                        <ListComponent
                           heading={'Candidate Name'}
                           subHeading={singleJobApplication?.applications[0]?.candidateName}
                        />
                        <ListComponent
                           heading={'Candidate Number'}
                           subHeading={singleJobApplication?.applications[0]?.candidateNumber}
                        />
                     </>
                  ) : null}
                  <ListComponent
                     heading={'Industry'}
                     subHeading={singleJobApplication?.applications[0]?.user.industry}
                  />
                  <ListComponent
                     heading={'Eligibility'}
                     subHeading={singleJobApplication?.applications[0]?.user.eligibility}
                  />
                  <h5 className="mt-4">Skills</h5>
                  <div className="mt-3 topDiv">
                     {!!singleJobApplication?.applications[0]?.user?.skills &&
                     singleJobApplication?.applications[0]?.user?.skills.length ? (
                        singleJobApplication?.applications[0]?.user?.skills.map((el) => (
                           <div className="skill_Round_div shadow" key={el._id}>
                              {el.skill}
                           </div>
                        ))
                     ) : (
                        <p>No Skills</p>
                     )}
                  </div>
               </>
            ) : null}
         </div>
      </styled.div>,
      document.getElementById('application')
   );
}

export default SingleJobApplicationPopupComponent;
