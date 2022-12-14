import React, { useEffect, useState } from "react";
import * as styled from "./JobApplicationComponent.style";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import { Row } from "./TableRowData";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import { getAllJobApplications } from "../../App/Features/Admin/adminSlice";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import { BiRupee } from "@react-icons/all-files/bi/BiRupee";
import SingleJobApplicationPopupComponent from "../SingleJobApplicationPopupComponent/SingleJobApplicationPopupComponent";
import { GrFormView } from "@react-icons/all-files/gr/GrFormView";

function JobApplicationComponent() {
   const [cookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();
   const [ShowPopUp, setShowPopUp] = useState({
      show: false,
      jobId: "",
      token: "",
   });
   const { allJobApplications, allJobApplicationsFetchLoading, allJobApplicationsFetchError } =
      useSelector((state) => state.admin);

   const ViewHandler = function (jobId) {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         setShowPopUp({
            jobId,
            show: true,
            token: cookie?._ijp_at_user?.token,
         });
      }
   };
   const ClosePopup = function () {
      setShowPopUp({
         show: false,
         jobId: "",
         token: "",
      });
   };

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         dispatch(
            getAllJobApplications({
               token: cookie?._ijp_at_user?.token,
               page: 1,
            })
         );
      }
   }, []);

   if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.role !== "admin") {
      return <Navigate to={"/"} />;
   }

   return (
      <styled.div>
         <SingleJobApplicationPopupComponent show={ShowPopUp} CloseHandler={ClosePopup} />
         <HeadingComponent
            heading={"Job Applications"}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`}
         />
         <div className="mt-5">
            {!!allJobApplicationsFetchLoading ? (
               <SpennerComponent />
            ) : !allJobApplications && !!allJobApplicationsFetchError ? (
               <div>
                  <p className=" text-red-500">{allJobApplicationsFetchError}</p>
               </div>
            ) : !allJobApplicationsFetchLoading &&
              !!allJobApplications &&
              allJobApplications?.success &&
              allJobApplications?.applications &&
              allJobApplications?.applications.length ? (
               <table>
                  <tr>
                     {Row.map((el) => (
                        <th key={el.value.replaceAll(" ", "-")}>{el.value}</th>
                     ))}
                  </tr>

                  {allJobApplications?.applications.map((elm) => (
                     <tr key={elm._id} id={elm._id} className=" shadow-sm">
                        <td className="p-3">
                           <div className="userProfileDiv">
                              <img src={`/usersProfileCompress/${elm?.user?.userProfile}`} alt="" />
                           </div>
                        </td>
                        <td className=" text-gray-600 text-sm">{elm?.user?.name}</td>
                        <td className=" text-sky-600 text-sm">{elm?.user?.email}</td>
                        <td className=" text-sky-600 text-sm">{elm?.jobApplied?.jobTitle}</td>
                        <td className=" text-gray-600 text-sm ">
                           <div className="flex items-center">
                              <BiRupee /> {elm?.jobApplied.salaryRangeStart} -{" "}
                              {elm?.jobApplied?.salaryRangeEnd}
                           </div>
                        </td>
                        <td className=" text-gray-600 text-sm">{elm?.user?.cityState}</td>
                        <td className=" text-gray-600 text-sm">{elm?.user?.phone}</td>
                        <td className=" text-gray-600 text-sm">{elm?.user?.postalCode}</td>
                        <td>
                           <GrFormView
                              className=" cursor-pointer"
                              onClick={() => ViewHandler(elm._id)}
                           />
                        </td>
                     </tr>
                  ))}
               </table>
            ) : (
               <div className=" text-center">
                  <div class="four_zero_four_bg">
                     <h1 class="text-center ">No job submited</h1>
                  </div>
               </div>
            )}
         </div>
      </styled.div>
   );
}

export default JobApplicationComponent;
