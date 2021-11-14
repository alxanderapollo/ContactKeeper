//useReducer is so that we have access to state and dispatch so we can dispatch to our reducer
import React, { useReducer } from "react";
import uuid from "uuid"; //generate random ids
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
  };

  const [state,dispatch] = useReducer(ContactReducer, initialState);
  //Actions
  //Add Contact

  //Delete Contact
  //Set Current Contact

  //Clear Current ContactReducer
  //update Contact

  //Filter Contacts

  //Clear Filter

  //return our provider so we can wrap our entire app with this context

  return (
      <ContactContext.Provider
      //provide all the values
      //anything we want to be able to access from other components are placed inside of here
      value={{
          contacts: state.contacts
      }}
      >
          {props.children}
      </ContactContext.Provider>
  )
};
export default ContactState;
