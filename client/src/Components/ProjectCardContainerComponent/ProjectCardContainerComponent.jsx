import React from "react";
import { useSelector } from "react-redux";
import * as styled from "./ProjectCardContainerComponent.style";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";

import ProjectCardComponent from "../ProjectCardComponent/ProjectCardComponent";

function ProjectCardContainerComponent() {
   const { projects, projectsLoading, fetchProductsError } = useSelector((state) => state.admin);

   return (
      <styled.div>
         <div>
            {projectsLoading ? (
               <div className="p-2 flex items-center justify-center">
                  <SpennerComponent />
               </div>
            ) : null}
            {!!fetchProductsError ? <p className="error_text">{fetchProductsError}</p> : null}
            {!!projects && projects?.projects && projects?.projects.length ? (
               <div className="container">
                  <div className="row">
                     {projects.projects.map((el) => (
                        <ProjectCardComponent key={el._id} el={el} />
                     ))}
                  </div>
               </div>
            ) : (
               <div>
                  <p className="text-gray-500 text-sm">No projects</p>
               </div>
            )}
         </div>
      </styled.div>
   );
}

export default ProjectCardContainerComponent;
