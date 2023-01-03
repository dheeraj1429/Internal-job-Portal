import React, { createContext, useReducer } from "react";
import { USER_ACTION_TYPE } from "./ActionType";

const PopupContext = createContext(null);

const Context = function ({ children }) {
   const INITAL_STATE = {
      showPopUp: false,
      selectedProject: null,
   };

   const [state, dispatch] = useReducer(function (state, action) {
      switch (action.type) {
         case USER_ACTION_TYPE.SHOW_GROUP_POPUP:
            return {
               ...state,
               showPopUp: action.show,
            };
         case USER_ACTION_TYPE.STORE_SELECTED_PROJECT:
            return {
               ...state,
               selectedProject: action.payload,
            };
      }
   }, INITAL_STATE);

   return <PopupContext.Provider value={{ state, dispatch }}>{children}</PopupContext.Provider>;
};

export const UserContext = function () {
   return React.useContext(PopupContext);
};

export default Context;
