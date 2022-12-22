import React, { useEffect, useState } from "react";
import * as styled from "./PaginationFooterComponent.style";
import { useDispatch } from "react-redux";
import CustomButtonComponent from "../../HelperComponents/CustomButtonComponent/CustomButtonComponent";
import { IoIosArrowRoundForward } from "@react-icons/all-files/io/IoIosArrowRoundForward";
import { IoIosArrowRoundBack } from "@react-icons/all-files/io/IoIosArrowRoundBack";
import { useCookies } from "react-cookie";

function PaginationFooterComponent({ action, data, filed }) {
   const [Page, setPage] = useState(0);
   const [cookie] = useCookies(["_ijp_at_user"]);

   const dispatch = useDispatch();

   const ChangeToNext = function () {
      if (Page >= 0 && !!data && data?.totalPages > Page) {
         setPage((PrevState) => PrevState + 1);
      }
   };

   const ChangeToPrev = function () {
      if (Page > 0) {
         setPage((PrevState) => PrevState - 1);
      }
   };

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (Page) {
            dispatch(action({ token: cookie?._ijp_at_user?.token, page: Page }));
         }
      }
      if (!Page) {
         dispatch(action({ token: cookie?._ijp_at_user?.token, page: Page }));
      }
   }, [Page]);

   return (
      <styled.div className="flex justify-between items-center w-100">
         <div>
            <p className="text-sm text-gray-600">
               {!!data && data?.[filed].length} / {!!data && data?.totalDocuments} employees page {Page + 1}
            </p>
         </div>
         <div className="flex items-center">
            <CustomButtonComponent btnCl={Page > 0 ? "pagination_btn shadow" : "PrevDisable_btn bg-dark shadow"} onClick={ChangeToPrev}>
               <IoIosArrowRoundBack />
            </CustomButtonComponent>
            <CustomButtonComponent
               btnCl={!!data && data?.totalPages > Page ? "pagination_btn shadow" : "PrevDisable_btn bg-dark shadow"}
               onClick={ChangeToNext}
            >
               <IoIosArrowRoundForward />
            </CustomButtonComponent>
         </div>
      </styled.div>
   );
}

export default React.memo(PaginationFooterComponent);
