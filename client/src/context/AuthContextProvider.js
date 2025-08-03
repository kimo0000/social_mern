import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: 
   JSON.parse(localStorage.getItem("user")) || null
  // {
  //   _id: "686d81921df7f2b01d5198f9",
  //   username: "karim",
  //   email: "karim@gmail.com",
  //   profilePicture: "",
  //   coverPicture: "",
  //   isAdmin: false,
  //   followers: [],
  //   followings: [],
  //  }
  ,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

   useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
