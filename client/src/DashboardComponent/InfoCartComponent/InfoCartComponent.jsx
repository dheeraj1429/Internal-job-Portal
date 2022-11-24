import React from 'react';
import * as styled from './InfoCartComponent.style';

function InfoCartComponent({ imgSrc, smHeading, secondHeading, active, color }) {
   return (
      <styled.div
         className=" shadow"
         active={active}
         style={
            color
               ? {
                    backgroundColor: `var(${color})`,
                 }
               : null
         }
      >
         <div className="imageDiv mx-auto mb-3">
            <img src={imgSrc} alt="" />
         </div>
         <h5 active={active}>{smHeading}</h5>
         <h4 active={active} className=" mt-1">
            {secondHeading}
         </h4>
      </styled.div>
   );
}

export default InfoCartComponent;
