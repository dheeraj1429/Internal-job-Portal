import React from "react";
import { ENDPOINT } from "../Components/Helper/helper";
import socketIOClient from "socket.io-client";

// socket connection
export const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });

// create a socket context provider
export const SocketContext = React.createContext();
