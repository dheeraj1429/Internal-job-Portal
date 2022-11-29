import React from 'react';
import * as styled from './ListComponent.style';

function ListComponent({ heading, subHeading, subHeadingSecond, icon }) {
   return (
      <styled.div>
         <div className="mt-2 d-flex items-center text-sm">
            <div className="space_div">
               <p>{heading}</p>
            </div>
            <span className=" text-gray-500 flex items-center">
               {!!icon ? icon : null}
               {subHeading} {!!subHeadingSecond ? subHeadingSecond : null}
            </span>
         </div>
      </styled.div>
   );
}

export default ListComponent;
