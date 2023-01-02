import React, { useEffect } from "react";
import * as styled from "./ProjectsContainerComponent.style";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import { useDispatch } from "react-redux";
import { getAllProject } from "../../App/Features/Admin/adminSlice";
import { useCookies } from "react-cookie";
import ProjectCardContainerComponent from "../ProjectCardContainerComponent/ProjectCardContainerComponent";

const link = "/projects/create";

function ProjectsContainerComponent() {
   const dispatch = useDispatch();
   const [cookie] = useCookies(["_ijp_at_user"]);

   useEffect(() => {
      if (cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         dispatch(getAllProject({ token: cookie?._ijp_at_user?.token, page: 0 }));
      }
   }, []);

   return (
      <styled.div>
         <HeadingComponent
            heading={"Projects"}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            btn={true}
            link={link}
         />
         <div className="mt-5">
            <ProjectCardContainerComponent />
         </div>
      </styled.div>
   );
}

export default ProjectsContainerComponent;
