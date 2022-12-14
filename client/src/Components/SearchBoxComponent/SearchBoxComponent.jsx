import React from "react";
import * as styled from "./SearchBoxComponent.style";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";

function SearchBoxComponent() {
   return (
      <styled.div className="searchDiv border flex items-center rounded-lg shadow">
         <div className="searchButton_div">
            <BsSearch />
         </div>
         <input type="search" className="p-2" placeholder="Search..." />
      </styled.div>
   );
}

export default React.memo(SearchBoxComponent);
