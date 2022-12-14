import React from "react";
import * as styled from "./EmployeesGroupComponent.style";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";

function EmployeesGroupComponent() {
  return (
    <styled.div>
      <HeadingComponent
        heading={"Employees group"}
        subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`}
        btn={true}
        link={"/groups/create"}
      />
    </styled.div>
  );
}

export default EmployeesGroupComponent;
