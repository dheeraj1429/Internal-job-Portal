import React, { useState, useEffect } from "react";
import * as styled from "./CreateProjectComponent.style";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomButtonComponent from "../../HelperComponents/CustomButtonComponent/CustomButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { postNewProject, removeProjectNotification } from "../../App/Features/Admin/adminSlice";
import { message } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const ServicesAr = [
   { value: "Web Development" },
   { value: "Digital Marketing" },
   { value: "SEO" },
   { value: "Graphic Design" },
   { value: "Motion Design" },
   { value: "App Development" },
];

function CreateProjectComponent() {
   const [cookie] = useCookies(["_ijp_at_user"]);
   const [ProjectInfo, setProjectInfo] = useState({
      name: "",
      service: "",
      clientName: "",
      clientEmail: "",
      clientNumber: "",
      clientAddress: "",
      description: "",
      ProjectDateStart: new Date(),
      ProjectDateEnd: new Date(new Date().getTime() + 24 * 3 * 60 * 60 * 1000),
   });

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { postNewProjectRespose, postNewProjectLoading, postNewProjectFetchError } = useSelector(
      (state) => state.admin
   );

   const ChangeHandler = function (event, type, state) {
      if (type) {
         if (type === "DatePicker") {
            setProjectInfo({ ...ProjectInfo, [state]: event.$d });
         }
      } else {
         const { name, value } = event.target;
         setProjectInfo({
            ...ProjectInfo,
            [name]: value,
         });
      }
   };

   const SendHandler = function (event) {
      event.preventDefault();
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         if (
            ProjectInfo?.name &&
            ProjectInfo?.service &&
            ProjectInfo?.clientName &&
            ProjectInfo?.clientEmail
         ) {
            dispatch(postNewProject({ token: cookie?._ijp_at_user?.token, data: ProjectInfo }));
         } else {
            message.info("Please fill all required fildes");
         }
      } else {
         navigation("/portal/signin");
      }
   };

   useEffect(() => {
      if (postNewProjectRespose) {
         if (!postNewProjectRespose?.success) return message.error(postNewProjectRespose.message);

         message.success(postNewProjectRespose.message);
      }
   }, [postNewProjectRespose]);

   useEffect(() => {
      return () => {
         dispatch(removeProjectNotification());
      };
   }, []);

   return (
      <styled.div>
         <HeadingComponent
            heading={"New project"}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever `}
         />
         <div className="mt-4">
            <form onSubmit={SendHandler}>
               <Box
                  sx={{
                     "& > :not(style)": { my: 3, width: "100%" },
                  }}
               >
                  <div className="md:block lg:flex w-100 items-center">
                     <TextField
                        className="w-100"
                        name="name"
                        required
                        type={"text"}
                        onChange={(event) => ChangeHandler(event)}
                        value={ProjectInfo.name}
                        label="Project name"
                        variant="outlined"
                     />
                     <TextField
                        className="w-100 ms-0 ms-lg-2 mt-3 mt-lg-0"
                        select
                        required
                        label="Services"
                        onChange={(event) => ChangeHandler(event)}
                        value={ProjectInfo.service}
                        name="service"
                     >
                        {ServicesAr.map((option) => (
                           <MenuItem key={option.value.replaceAll(" ", "-")} value={option.value}>
                              {option.value}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
                  <TextField
                     id="outlined-multiline-static"
                     label="Project description"
                     multiline
                     rows={4}
                     name="description"
                     onChange={(event) => ChangeHandler(event)}
                     value={ProjectInfo.description}
                  />
                  <div className="w-100 md:block lg:flex items-center">
                     <TextField
                        className="w-100"
                        name="clientName"
                        required
                        type={"text"}
                        onChange={(event) => ChangeHandler(event)}
                        value={ProjectInfo.clientName}
                        label="Client name"
                        variant="outlined"
                        helperText="Enter client name"
                     />
                     <TextField
                        className="w-100 ms-0 ms-lg-2 mt-2 mt-lg-0"
                        name="clientEmail"
                        required
                        type={"email"}
                        onChange={(event) => ChangeHandler(event)}
                        value={ProjectInfo.clientEmail}
                        label="Client email"
                        variant="outlined"
                        helperText="Enter client email"
                     />
                     <TextField
                        className="w-100 ms-0 ms-lg-2 mt-2 mt-lg-0"
                        name="clientNumber"
                        required
                        type={"number"}
                        onChange={(event) => ChangeHandler(event)}
                        value={ProjectInfo.clientNumber}
                        label="Client number"
                        variant="outlined"
                        helperText="Enter client phone number"
                     />
                     <TextField
                        className="w-100 ms-0 ms-lg-2 mt-2 mt-lg-0"
                        name="clientAddress"
                        type={"text"}
                        onChange={(event) => ChangeHandler(event)}
                        value={ProjectInfo.clientAddress}
                        label="Client address"
                        variant="outlined"
                        helperText="Client address ( optional )"
                     />
                  </div>
                  <p className="text-gray-600 text-sm">
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to make a type
                     specimen book. It has survived not only five centuries, but also the leap into
                     electronic typesetting, remaining essentially unchanged. It was popularised in
                     the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                     and more recently with desktop publishing software like Aldus PageMaker
                     including versions of Lorem Ipsum.
                  </p>
                  <div className="sm:block lg:flex items-center w-100 mt-4">
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                           className="w-100"
                           required
                           disablePast
                           label="Project start date"
                           inputFormat="MM/DD/YYYY"
                           value={ProjectInfo.ProjectDateStart}
                           onChange={(envet) =>
                              ChangeHandler(envet, "DatePicker", "ProjectDateStart")
                           }
                           renderInput={(params) => <TextField {...params} />}
                        />
                        <MobileDatePicker
                           className="w-100 ms-0 ms-lg-2 mt-4 mt-lg-0"
                           required
                           disablePast
                           label="Project end date"
                           inputFormat="MM/DD/YYYY"
                           value={ProjectInfo.ProjectDateEnd}
                           onChange={(envet) =>
                              ChangeHandler(envet, "DatePicker", "ProjectDateEnd")
                           }
                           renderInput={(params) => <TextField {...params} />}
                        />
                     </LocalizationProvider>
                  </div>
               </Box>
               <CustomButtonComponent
                  type={"submit"}
                  innerText={"Save"}
                  btnCl={"category_upload"}
                  isLaoding={postNewProjectLoading}
               />
               {!!postNewProjectFetchError ? (
                  <p className="error_text">{postNewProjectFetchError}</p>
               ) : null}
               <p className="mt-2">
                  <strong>Note: </strong>
                  <span className="text-gray-700 text-sm">
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </span>
               </p>
            </form>
         </div>
      </styled.div>
   );
}

export default CreateProjectComponent;
