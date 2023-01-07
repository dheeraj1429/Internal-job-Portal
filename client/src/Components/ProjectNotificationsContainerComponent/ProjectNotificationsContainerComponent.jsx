import React, { useContext, useEffect, useState } from "react";
import * as styled from "./ProjectNotificationsContainerComponent.style";
import { SocketContext } from "../../Context/socket";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import ProjectNotificationCartComponent from "../ProjectNotificationCartComponent/ProjectNotificationCartComponent";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPinnedProjects } from "../../App/Features/index/indexSlice";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import SelectGroupPopupComponent from "../SelectGroupPopupComponent/SelectGroupPopupComponent";
import Context from "../../Context/UserContext";

function ProjectNotificationsContainerComponent() {
   const [PinnedProjects, setPinnedProjects] = useState([]);
   const socket = useContext(SocketContext);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const dispatch = useDispatch();

   const { allPinnedProjects, getAllPinnedProjectsLoading, allPinnedProjectsFetchError } =
      useSelector((state) => state.index);

   const ProjectNotificationHandler = function (args) {
      setPinnedProjects((prevState) => [args, ...prevState]);
   };

   useEffect(() => {
      if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         socket.on("_project_pinned_notifications", ProjectNotificationHandler);
         dispatch(getPinnedProjects({ token: cookie?._ijp_at_user?.token }));
      }

      return () => socket.off("_project_pinned_notifications", ProjectNotificationHandler);
   }, []);

   if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.role === "admin") {
      return <Navigate to={"/"} />;
   }

   return (
      <styled.div>
         <Context>
            <SelectGroupPopupComponent />
            <HeadingComponent
               heading={"Pinned Projects"}
               subHeading={`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis voluptatem praesentium asperiores nesciunt porro possimus molestiae velit optio voluptatum.`}
            />
            {!!getAllPinnedProjectsLoading ? (
               <div className="mt-4 flex items-center justify-center">
                  <SpennerComponent />
               </div>
            ) : null}
            {PinnedProjects.length ? (
               <div className="mt-4">
                  <div className="container">
                     <div className="row">
                        {PinnedProjects.map((el) => (
                           <ProjectNotificationCartComponent key={el?._id} data={el} />
                        ))}
                     </div>
                  </div>
               </div>
            ) : null}
            {!!allPinnedProjects &&
            allPinnedProjects?.success &&
            allPinnedProjects?.projectInfo?.length ? (
               <div className="mt-4">
                  <div className="container">
                     <div className="row">
                        {allPinnedProjects.projectInfo.map((el) => (
                           <ProjectNotificationCartComponent
                              key={el?._id}
                              data={el?.projectId}
                              userInfo={el?.userId}
                              createdAt={el?.createdAt}
                              clientBy={el?.clientBy}
                           />
                        ))}
                     </div>
                  </div>
               </div>
            ) : null}
            {!!allPinnedProjects &&
            allPinnedProjects?.success &&
            !allPinnedProjects?.projectInfo?.length &&
            !PinnedProjects?.length ? (
               <p className="mt-4">No Project pinned</p>
            ) : null}
            {!!allPinnedProjectsFetchError ? (
               <div className="mt-4">
                  <p className="error_text">{allPinnedProjectsFetchError}</p>
               </div>
            ) : null}
         </Context>
      </styled.div>
   );
}

export default ProjectNotificationsContainerComponent;
