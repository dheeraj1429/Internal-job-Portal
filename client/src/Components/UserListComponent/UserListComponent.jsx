import React from "react";
import * as styled from "./UserListComponent.style";
import { TiDelete } from "@react-icons/all-files/ti/TiDelete";

function UserListComponent({ data, removeHandler }) {
  return (
    <styled.div>
      <div className="emDiv flex items-center justify-between mb-3 shadow p-3 rounded">
        <div>
          <h5 className="text-lg">{data.name}</h5>
          <p className=" text-gray-600 text-sm mt-1">{data.email}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-gray-700">Role: {data.role}</p>
          <TiDelete className="ms-2 error_text" onClick={() => removeHandler(data._id)} />
        </div>
      </div>
    </styled.div>
  );
}

export default React.memo(UserListComponent);
