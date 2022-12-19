import React from "react";
import * as styled from "./SpennerComponent.style";

function SpennerComponent({ center, type }) {
   return (
      <styled.div center={center}>{!!type ? <img src="/images/speener-white.svg" alt="" /> : <img src="/images/spenner.svg" alt="" />}</styled.div>
   );
}

export default SpennerComponent;
