import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };

      //Update Contact
      case UPDATE_CONTACT:
          return {
              ...state,
            //   map through each contact - if the contact id is equal to the payload id
            //return action.paload otherwise return the contact
              contacts:state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact )
          }

    //takes our state
    //return and filter through our contacts -> filter function returns an array of contacts
    //this function will return an arra without the particular passed ID
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    //Return state and contacts will be the passed payload
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    //contacts is set to null because we are resetting the state to an empty one
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};
