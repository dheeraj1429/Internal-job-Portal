import React from 'react';
import * as styled from './HeadingComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { Link } from 'react-router-dom';

function HeadingComponent({ heading, subHeading, btn }) {
   return (
      <styled.div>
         <div className="flex items-center justify-between">
            <h1>{heading}</h1>
            {!!btn ? (
               <Link to={'/dashboard/job/create'}>
                  <CustomButtonComponent innerText={'Create'} btnCl={'category_upload mb-2'} />
               </Link>
            ) : null}
         </div>
         {!!subHeading ? <p className=" text-gray-500">{subHeading}</p> : null}
      </styled.div>
   );
}

export default HeadingComponent;
