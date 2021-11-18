//useReducer is so that we have access to state and dispatch so we can dispatch to our reducer
import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid"; //generate random ids
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

//curent is set to null because want to happen is when we click edit, we want whatever object is clicked edit on willl be placed into the empty peice of state that is current
const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Sarah Watson",
        email: "sara@gmail.com",
        phone: "222-222-2222",
        type: "personal",
      },
      {
        id: 3,
        name: "Hary White",
        email: "Hary@gmail.com",
        phone: "333-333-3333",
        type: "personal",
      }
    ],
    current:null 
  };

  const [state,dispatch] = useReducer(ContactReducer, initialState);
  //Actions
  //Add Contact
  const addContact = contact => {
      //produces a random id
    contact.id = uuidv4();  
    dispatch({type: ADD_CONTACT, payload: contact});
  }

  //Delete Contact
  //doesnt require the entire contact obj with the id it can find and delete the contact
  const deleteContact = id => {
  dispatch({type: DELETE_CONTACT, payload: id});
}

  //Set Current Contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact});
  }

  //Clear Current ContactReducer
  //no payload because it doesnt change state 
  const clearCurrent = () => {
    dispatch({type:CLEAR_CURRENT});
  }
  //update Contact

  //Filter Contacts

  //Clear Filter

  //return our provider so we can wrap our entire app with this context

  return (
      <ContactContext.Provider
      //provide all the values
      //anything we want to be able to access from other components are placed inside of here
      //two peices of state - our contact list and current which is by default set to null
      value={{
          contacts: state.contacts,
          current:state.current,
          addContact,
          deleteContact,
          setCurrent,
          clearCurrent
      }}
      >
          {props.children}
      </ContactContext.Provider>
  )
};
export default ContactState;
