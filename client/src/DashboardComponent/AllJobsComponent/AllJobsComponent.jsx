import React from 'react';
import * as styled from './AllJobsComponent.style';
import HeadingComponent from '../../Components/HeadingComponent/HeadingComponent';
import JobPostsCartListComponent from '../JobPostsCartListComponent/JobPostsCartListComponent';

function AllJobsComponent() {
   return (
      <styled.div>
         <HeadingComponent
            btn={true}
            heading={'Recent Job Posts'}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
         />
         <div className="mt-5">
            <JobPostsCartListComponent />
         </div>
      </styled.div>
   );
}

export default AllJobsComponent;
