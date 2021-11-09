import React, { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./AuthContext";
require("dotenv").config();

export const SocketContext = React.createContext({});

const SocketProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const socket = io(
    window.location.hostname === "lessonlover.com"
      ? process.env.REACT_APP_LIVE_API_BASE_URL
      : process.env.REACT_APP_LOCAL_API_BASE_URL,
    {
      withCredentials: true,
    }
  );
  useEffect(() => {
    socket?.emit("createPersonalRoom", currentUser.uuId);
  }, [currentUser.uuId, socket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
