import React from "react";
import * as styled from "./AttachedPrevComponent.style";

function AttachedPrevComponent({ show, imagePrev }) {
   return (
      <styled.div show={show} className="shadow">
         {!!imagePrev?.value ? (
            <img src={`/attacthFiles/compressImages/${imagePrev?.value}`} alt="" />
         ) : null}
      </styled.div>
   );
}

export default AttachedPrevComponent;
