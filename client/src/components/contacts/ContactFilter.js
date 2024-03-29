import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  const text = useRef(""); //use ref is a way to refrence a dom object

  useEffect(() => {
    if (filtered === null) { 
      text.current.value = "";
    }
  });
  const onChange = (e) => {
    //text.current.value is the actual value
    if (text.current.value !== "") {
        filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      {/* will filter right when the text change */}
      <input
        ref={text}
        type="text"
        placeholder="Filter contacts..."
        onChange={onChange}
      />
    </form>
  );
};
export default ContactFilter;
