import React, { useState, useEffect } from "react";
import * as styled from "./CreateEmployeesGroupComponent.style";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomButtonComponent from "../../HelperComponents/CustomButtonComponent/CustomButtonComponent";
import EmployeesPopupComponent from "../EmployeesPopupComponent/EmployeesPopupComponent";
import { getAllLoginUsers } from "../../App/Features/Admin/adminSlice";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import UserListComponent from "../UserListComponent/UserListComponent";
import socketIOClient from "socket.io-client";
import { message } from "antd";
import {
   createEmployeesGroup,
   createEmployeesGroupLoading,
} from "../../App/Features/Admin/adminSlice";
import { ENDPOINT } from "../Helper/helper";

// connection socket
const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });

function CreateEmployeesGroupComponent() {
   const [GroupInfo, setGroupInfo] = useState({
      groupName: "",
      employees: [],
   });
   const [ShowPopUp, setShowPopUp] = useState(false);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();
   const { employeesCreateGroupLoading, employeesGroup } = useSelector((state) => state.admin);

   const ShowAndHidHandler = function (data) {
      setShowPopUp(data);
   };

   const ChangeHandler = function (event) {
      const { name, value } = event.target;
      setGroupInfo({ ...GroupInfo, [name]: value });
   };

   const SelecteEmployeesHandler = function (data) {
      const isExist = GroupInfo.employees.find((el) => el._id === data._id);

      if (isExist) {
         return message.error("Selected user is already exists");
      }

      setGroupInfo({
         ...GroupInfo,
         employees: GroupInfo.employees.concat(data),
      });
      setShowPopUp(false);
   };

   const RemoveSelectedUsers = function (id) {
      setGroupInfo({
         ...GroupInfo,
         employees: GroupInfo.employees.filter((el) => el._id !== id),
      });
   };

   const SaveHandler = function () {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (GroupInfo.groupName) {
            dispatch(createEmployeesGroupLoading({ data: true }));
            socket.emit(
               "_create_group",
               Object.assign(GroupInfo, { groupAdmin: cookie?._ijp_at_user.name })
            );
         } else {
            message.info("Group name is required");
         }
      }
   };

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         dispatch(getAllLoginUsers({ token: cookie?._ijp_at_user?.token, page: 0 }));
      }
   }, []);

   useEffect(() => {
      socket.on("_group_created", (args) => {
         dispatch(createEmployeesGroup(args));
      });
   }, [socket]);

   return (
      <styled.div className="sidePaddingOne">
         <HeadingComponent
            heading={"Create employees groups"}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`}
         />
         <div className="mt-3">
            <Box
               component="form"
               sx={{
                  "& > :not(style)": { my: 1, width: "100%" },
               }}
               noValidate
               autoComplete="off"
            >
               <TextField
                  id="outlined-basic"
                  label="Group name"
                  name="groupName"
                  value={GroupInfo.groupName}
                  onChange={ChangeHandler}
                  variant="outlined"
               />
               <p className="text-gray-700 text-sm">Employees you want to add</p>
               <div className="searchEmployeesDiv">
                  <input
                     className="searchBoxInput"
                     type="search"
                     placeholder="Search employees"
                     onClick={() => ShowAndHidHandler(true)}
                  />
                  <EmployeesPopupComponent
                     show={ShowPopUp}
                     hideHandler={ShowAndHidHandler}
                     userHandler={SelecteEmployeesHandler}
                  />
               </div>
            </Box>
            <div className="Selected_users mt-3">
               {GroupInfo?.employees && GroupInfo?.employees.length ? (
                  <>
                     <p className="mb-4 text-gray-600">Selected group memebers</p>
                     {GroupInfo?.employees.map((el) => (
                        <UserListComponent
                           key={el._id}
                           data={el}
                           removeHandler={RemoveSelectedUsers}
                        />
                     ))}
                  </>
               ) : null}
            </div>
            <CustomButtonComponent
               onClick={SaveHandler}
               isLaoding={employeesCreateGroupLoading}
               innerText={"Create"}
               btnCl={"category_upload"}
            />
            {!!employeesGroup?.error && !employeesGroup?.error?.success ? (
               <p className="error_text mt-2">{employeesGroup?.error?.message}</p>
            ) : null}
         </div>
      </styled.div>
   );
}

export default CreateEmployeesGroupComponent;
