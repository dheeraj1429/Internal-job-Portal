import React from 'react';
import ReactDOM from 'react-dom';
import * as styled from './PopupAlertComponent.style';
import { Link } from 'react-router-dom';

function PopupAlertComponent({ show }) {
   return ReactDOM.createPortal(
      <styled.div show={show?.success || false}>
         <styled.mainDiv show={show?.success || false} className="shadow">
            <div
               class={show?.success ? 'success-message active mx-auto' : 'success-message  mx-auto'}
            >
               <svg viewBox="0 0 76 76" class="success-message__icon icon-checkmark mx-auto mb-3">
                  <circle cx="38" cy="38" r="36" />
                  <path
                     fill="none"
                     stroke="#FFFFFF"
                     stroke-width="5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-miterlimit="10"
                     d="M17.7,40.9l10.9,10.9l28.7-28.7"
                  />
               </svg>
               <h1 class="success-message__title">{!!show?.message ? show.message : null}</h1>
               <div class="success-message__content">
                  <p className=" text-gray-700">
                     You application submited{' '}
                     <Link to={'/'}>
                        <span className=" text-sky-400">Home</span>
                     </Link>
                     . We will automatically send order information into your email account.
                  </p>
               </div>
            </div>
         </styled.mainDiv>
      </styled.div>,
      document.getElementById('popupAlert')
   );
}

export default PopupAlertComponent;
