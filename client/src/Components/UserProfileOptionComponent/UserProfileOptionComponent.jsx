import React from "react";
import * as styled from "./UserProfileOptionComponent.style";
import ProfileInnerSmComponent from "../ProfileInnerSmComponent/ProfileInnerSmComponent";
import { VscAccount } from "@react-icons/all-files/vsc/VscAccount";
import { GrContactInfo } from "@react-icons/all-files/gr/GrContactInfo";
import { AiOutlineFilePdf } from "@react-icons/all-files/ai/AiOutlineFilePdf";
import { useSelector } from "react-redux";

function UserProfileOptionComponent({ show, onClick }) {
   const { user } = useSelector((state) => state.auth);

   return (
      <styled.div show={show} onClick={onClick} className="shadow">
         <div className="overFlow_div"></div>
         <ProfileInnerSmComponent icon={<VscAccount />} heading={"My Account"} />
         <ProfileInnerSmComponent icon={<GrContactInfo />} heading={"Contact"} />
         {!!user && user?.userObject ? (
            user?.userObject?.role === "admin" ? null : (
               <ProfileInnerSmComponent icon={<AiOutlineFilePdf />} heading={"resume"} />
            )
         ) : null}
      </styled.div>
   );
}

export default UserProfileOptionComponent;
