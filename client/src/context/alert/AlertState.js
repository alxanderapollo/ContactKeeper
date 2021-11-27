//useReducer is so that we have access to state and dispatch so we can dispatch to our reducer
import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { v4 as uuidv4 } from "uuid"; //generate random ids
import {
  SET_ALERT,
  REMOVE_ALERT
} from "../types";

//curent is set to null because want to happen is when we click edit, we want whatever object is clicked edit on willl be placed into the empty peice of state that is current
const AlertState = (props) => {
  
  const initialState = {
  };
  //contacts are already fetched - so we need a peice of state dedicated to filtering contacts
  const [state, dispatch] = useReducer(AlertReducer, initialState);
  //Actions
  
  //Set Alert
  const setAlert = (msg, type, timeout = 5000) =>{
    const id = uuidv4();  
      dispatch({
          type:SET_ALERT,
          payload:{msg,type,id}
      })
      //payload is the id because we need to know whic one to remove
      setTimeout(() => dispatch({type:REMOVE_ALERT, payload:id}), timeout)
  }

  return (
    <AlertContext.Provider
      //provide all the values
      //anything we want to be able to access from other components are placed inside of here
      //two peices of state - our contact list and current which is by default set to null
      value={{
          alerts:state, 
          setAlert

      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
