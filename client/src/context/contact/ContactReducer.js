import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
  } from "../types";

  export default (state, action) =>{
      switch(action.type){
          case ADD_CONTACT:
              return{
                  ...state,
                  contacts:[...state.contacts, action.payload]
              }
              //takes our state
              //return and filter through our contacts -> filter function returns an array of contacts 
              //this function will return an arra without the particular passed ID
              case DELETE_CONTACT:
              return{
                  ...state,
                  contacts:state.contacts.filter(contact => contact.id !== action.payload)
              }
          default:
              return state;
      }
  }