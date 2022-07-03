import { createContext, useReducer } from "react";
import React from "react";

export default function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // console.log(initialState);
  const login = (userData) => {
    //  localStorage.setItem("token", userData.token);
    console.log(userData);
    dispatch({ type: "LOGIN", payload: userData });
    console.log(state);
  };

  function logout() {
    // localStorage.removeItemItem("token");
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{ userId: state.userId, userName: state.userName, login, logout }}
      {...props}
    />
  );
}

const initialState = {
  userId: null,
  userName: null,
};

const AuthContext = createContext({
  userId: null,
  userName: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.userID,
        userName: action.payload.userName,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        userName: null,
      };
    default:
      return state;
  }
}
export { AuthContext, AuthProvider };
