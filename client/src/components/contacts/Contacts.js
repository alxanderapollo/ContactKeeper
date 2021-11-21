//pull in the contacts from the state into the contact component
//then map through and output and item for each one

import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext"; //bring in the context
import ContactItem from "../contacts/ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export const Contacts = () => {
  //initlize our context
  //now we have access to any state or actions associated with this context
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext; //pull in contact object

  //if theres no contacts prompt user to please add a contact
  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>;
  }

  // logic: pulling  filtered and contacts out then we check if there somsething in filtered
  //if its not null that means theres something in it then will map through that and show the contact item
  //otherwise if its null then we just show contacts
  return (
    <React.Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} className="item">
                <ContactItem  contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
            <CSSTransition key={contact.id}  timeout={500} className="item"  >
              <ContactItem contact={contact} />
            </CSSTransition>
            ))}
      </TransitionGroup>
    </React.Fragment>
  );
};

export default Contacts;
