import React from 'react';
import Contacts from '../contacts/Contacts' //import Contac
import ContactForm from '../contacts/ContactForm' //import Contacts

export const Home = () => {
    return (
        <div class="grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
            <Contacts/>
            </div>
            
        </div>
    )
}
export default Home