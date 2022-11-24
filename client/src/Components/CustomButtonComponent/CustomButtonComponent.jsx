import React from 'react';
import * as styled from './CustomButtonComponent.style';
import HOCSpenner from '../HocSpennerComponent/HocSpennerComponent';

function CustomButtonComponent({ innerText, btnCl, type, onClick }) {
   return (
      <styled.div>
         <styled.button
            onClick={onClick ? onClick : null}
            type={type ? type : 'button'}
            className={btnCl}
         >
            {innerText}
         </styled.button>
      </styled.div>
   );
}

export default HOCSpenner(React.memo(CustomButtonComponent));
