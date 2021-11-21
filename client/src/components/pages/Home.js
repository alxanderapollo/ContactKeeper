import React from "react";
import Contacts from "../contacts/Contacts"; //import Contac
import ContactForm from "../contacts/ContactForm"; //import Contacts
import ContactFilter from "../contacts/ContactFilter"; //import Contacts

export const Home = () => {
  return (
    <div class="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};
export default Home;
