//pull in the contacts from the state into the contact component
//then map through and output and item for each one

import React, {useContext} from 'react'
import ContactContext from '../../context/contact/ContactContext' //bring in the context
import ContactItem from '../contacts/ContactItem'
export const Contacts = () => {

    //initlize our context
    //now we have access to any state or actions associated with this context
    const contactContext = useContext(ContactContext); 

    const {contacts} = contactContext //pull in contact object

    return (
        <React.Fragment>
            {/* prinout each contact name */}
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact}/>
            ))}
            
        </React.Fragment>
    )
}

export default Contacts