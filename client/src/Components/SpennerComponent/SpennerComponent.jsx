import React from 'react';
import * as styled from './SpennerComponent.style';

function SpennerComponent({ center }) {
   return (
      <styled.div center={center}>
         <img src="/images/spenner.svg" alt="" />
      </styled.div>
   );
}

export default SpennerComponent;
