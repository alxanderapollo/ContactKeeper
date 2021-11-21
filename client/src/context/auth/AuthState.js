//useReducer is so that we have access to state and dispatch so we can dispatch to our reducer
import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

//curent is set to null because want to happen is when we click edit, we want whatever object is clicked edit on willl be placed into the empty peice of state that is current
const AuthState = (props) => {
    //token stored in local storage -access browser local storage
    //is atuehnticated - tells us if we are authenticated or not
    //loading set to true until we make a request and get response back
    //errors - in case we get any
  const initialState = {
        token:localStorage.getItem('token'),
        isAuthenticated: null, 
        loading:true,
        user: null,
        error:null
  };
  //contacts are already fetched - so we need a peice of state dedicated to filtering contacts
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  //Actions
  
  //Load User
  //Register User
  //Login in user 
  //Logout 
  //Clear Errors


  return (
    <AuthContext.Provider
      //provide all the values
      //anything we want to be able to access from other components are placed inside of here
      //two peices of state - our contact list and current which is by default set to null
      value={{
          token: state.token,
          isAuthenticated: state.token,
          loading: state.loading,
          user: state.user,
          error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
