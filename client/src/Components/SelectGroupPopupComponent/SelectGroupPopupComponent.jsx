import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import * as styled from "./SelectGroupPopupComponent.style";
import { UserContext } from "../../Context/UserContext";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { USER_ACTION_TYPE } from "../../Context/ActionType";
import { GrAdd } from "@react-icons/all-files/gr/GrAdd";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { getGroupLists } from "../../App/Features/index/indexSlice";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import { SocketContext } from "../../Context/socket";
import dayjs from "dayjs";

function SelectGroupPopupComponent() {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies(["_ijp_at_user"]);
   const { state, dispatch } = UserContext();
   const actionDispatch = useDispatch();

   const { groupLists, groupListsLoading, groupListsFetchError } = useSelector(
      (state) => state.index
   );

   console.log(state);

   const ClosePopUpHandler = function () {
      dispatch({ type: USER_ACTION_TYPE.SHOW_GROUP_POPUP, show: false });
   };

   const PinnedGroupMessageHandler = function (groupId) {
      if (cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         socket.emit("_pin_group_project", {
            groupId,
            projectName: state?.selectedProject?.name,
            description: state?.selectedProject?.description,
            ProjectDateStart: dayjs(state?.selectedProject?.ProjectDateStart).format("DD/YYYY/MM"),
            ProjectDateEnd: dayjs(state?.selectedProject?.ProjectDateEnd).format("DD/YYYY/MM"),
            clientName: state?.selectedProject?.clientName,
            profilePic: cookie?._ijp_at_user?.profilePic,
            name: cookie?._ijp_at_user?.name,
            email: cookie?._ijp_at_user?.email,
            userId: cookie?._ijp_at_user?._id,
         });
      }
   };

   useEffect(() => {
      if (cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
         actionDispatch(getGroupLists({ token: cookie?._ijp_at_user?.token }));
      }
   }, []);

   return ReactDOM.createPortal(
      <styled.div show={state.showPopUp}>
         <styled.mainDiv show={state.showPopUp}>
            <div className="close_button shadow" onClick={ClosePopUpHandler}>
               <VscClose />
            </div>
            {!!groupListsLoading ? (
               <div className="flex items-center justify-center">
                  <SpennerComponent />
               </div>
            ) : null}
            {!!groupListsFetchError ? <p className="error_text">{groupListsFetchError}</p> : null}
            {!!groupLists && groupLists?.success && groupLists?.lists.length
               ? groupLists?.lists.map((el) => (
                    <styled.groupDiv>
                       <div className="flex items-center mt-3" key={el?._id}>
                          <div
                             className="group_icons_div shadow me-3"
                             onClick={() => PinnedGroupMessageHandler(el._id)}
                          >
                             <GrAdd className="text-sm" />
                          </div>
                          <h5 className="text-gray-800">{el?.groupName}</h5>
                       </div>
                    </styled.groupDiv>
                 ))
               : null}
         </styled.mainDiv>
      </styled.div>,
      document.getElementById("popupAlert")
   );
}

export default React.memo(SelectGroupPopupComponent);
