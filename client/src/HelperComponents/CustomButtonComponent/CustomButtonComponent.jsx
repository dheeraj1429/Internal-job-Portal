import React from 'react';
import * as styled from './CustomButtonComponent.style';
import HOCSpenner from '../HocSpennerComponent/HocSpennerComponent';

function CustomButtonComponent({ innerText, btnCl, type, onClick, children }) {
   return (
      <styled.div>
         <styled.button
            onClick={onClick ? onClick : null}
            type={type ? type : 'button'}
            className={btnCl}
         >
            {!!children ? children : innerText}
         </styled.button>
      </styled.div>
   );
}

export default HOCSpenner(React.memo(CustomButtonComponent));
