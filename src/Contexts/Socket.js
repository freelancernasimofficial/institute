import React from "react";
import { io } from "socket.io-client";
require("dotenv").config();
const socket = io(process.env.REACT_APP_API_BASE_URL, {
  withCredentials: true,
});
export const SocketContext = React.createContext({});

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
