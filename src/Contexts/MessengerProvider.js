import React, { useContext, useReducer, useState } from "react";
import { UserContext } from "./AuthContext";

export const MessengerContext = React.createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MESSENGER":
      return {...state,friends:[action.payload]}
    case "CLOSE_MESSENGER":
      return { ...state, friends: action.payload }
    case "ADD_CONVERSATIONS":
      return { ...state, friends: state.friends.concat(action.payload) };

    default:
      return state;
  }
  
};

const MessengerProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, {friends:[]});
  return (
    <MessengerContext.Provider value={[state, dispatch]}>
      {children}
    </MessengerContext.Provider>
  );
};

export default MessengerProvider;
