import { Box } from "@mui/system";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import PageLoader from "../Components/PageLoader";
import UserReducer from "../Reducers/UserReducer";
import { SocketContext } from "./Socket";
export const UserContext = React.createContext({});
const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, false);
  const [loading, setloading] = useState(true);
  const windowLocation = window.location.pathname;
  const history = useHistory();
  useEffect(() => {
    
    const authorize = async () => {
      const res = await axios.get("/states");
      if (res?.data?.auth === true) {
        dispatch({ type: "SET_USER", payload: res.data });
        setloading(false)
      } else {
        history.push("/login");
      }
    };
    authorize()
  }, [history]);

  if (loading)
    return (
      <Box sx={{ height: "100vh", width: "100%" }}>
        <PageLoader />
      </Box>
    );
  return (
    state && (
      <UserContext.Provider value={{ currentUser: state, dispatch: dispatch }}>
        {children}
      </UserContext.Provider>
    )
  );
};
export default AuthContext;
