import React from "react";
import * as styled from "./EmployeesPopupComponent.style";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import { useSelector } from "react-redux";
import { getAllLoginUsers } from "../../App/Features/Admin/adminSlice";
import PaginationFooterComponent from "../PaginationFooterComponent/PaginationFooterComponent";

function EmployeesPopupComponent({ show, userHandler, hideHandler }) {
  const { allUsers, allUsersFetchLoading, allUsersFetchError } = useSelector(
    (state) => state.admin
  );

  return (
    <styled.div show={show}>
      <div className="overFlowDiv" onClick={() => hideHandler(false)}></div>
      <div className="prevEmployeesDiv shadow">
        {!!allUsersFetchLoading ? (
          <div className="center_div">
            <SpennerComponent />
          </div>
        ) : null}
        {!!allUsersFetchError ? (
          <div className="center_div">
            <p className="error_text">{allUsersFetchError}</p>
          </div>
        ) : null}
        {!!allUsers && allUsers?.success && allUsers?.users ? (
          <div>
            {allUsers?.users.map((el) => (
              <div
                className="emDiv flex items-center justify-between mb-3"
                key={el._id}
                onClick={() => userHandler(el)}
              >
                <div>
                  <h5 className="text-lg">{el.name}</h5>
                  <p className=" text-gray-600 text-sm mt-1">{el.email}</p>
                </div>
                <p className="text-sm text-gray-700">Role: {el.role}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="paginationFooterDiv w-100">
          <PaginationFooterComponent action={getAllLoginUsers} data={allUsers} filed={"users"} />
        </div>
      </div>
    </styled.div>
  );
}

export default React.memo(EmployeesPopupComponent);
