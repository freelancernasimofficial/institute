import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import UserReducer from "../Reducers/UserReducer";
import { SocketContext } from "./Socket";
export const UserContext = React.createContext({});
const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {});

  useEffect(() => {
    axios
      .get("/states")
      .then((response) => {
        dispatch({ type: "SET_USER", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "ERROR" });
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser: state, dispatch: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default AuthContext;
