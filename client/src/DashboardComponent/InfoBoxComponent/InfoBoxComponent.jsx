import React from 'react';
import * as styled from './InfoBoxComponent.style';
import InfoCartComponent from '../InfoCartComponent/InfoCartComponent';

const RowData = [
   {
      imageSrc: '/images/layers.svg',
      smHeading: 'Welcome to',
      secondHeading: 'Mighty Warners pvt.ltd',
      active: true,
   },
   {
      imageSrc: '/images/add.svg',
      smHeading: '254',
      secondHeading: 'Job Posted',
      active: false,
      color: '--smooth-yellow-cl',
   },
   {
      imageSrc: '/images/man.svg',
      smHeading: '2525',
      secondHeading: 'Applicants',
      active: false,
      color: '--smooth-blue-cl',
   },
   {
      imageSrc: '/images/close.svg',
      smHeading: '220',
      secondHeading: 'Job Closed',
      active: false,
      color: '--smooth-pink-cl',
   },
];

function InfoBoxComponent() {
   return (
      <styled.div className="mt-4">
         <div className="container-fluid p-0">
            <div className="row">
               {RowData.map((el) => (
                  <div
                     className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4"
                     key={el.imageSrc}
                  >
                     <InfoCartComponent
                        imgSrc={el.imageSrc}
                        smHeading={el.smHeading}
                        secondHeading={el.secondHeading}
                        active={el.active}
                        color={el?.color ? el.color : null}
                     />
                  </div>
               ))}
            </div>
         </div>
      </styled.div>
   );
}

export default InfoBoxComponent;
