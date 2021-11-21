//Use effect mimics the component did mount function
import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
export const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  //destructure the state and add contact function
  const { addContact, current,clearCurrent,updateContact } = contactContext;

  //want to fill the form based on whehter there is anything in the current value
  //so we bring in useEffect to do that to fill the form - if the current contact is emtpy then set
  //all the feilds to empty
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
    //this means we only want to update if the contactContext updates or the current state updates
  }, [current]);

  //example of setting a peice of state with default values
  //instead of setting each attrobute wecan use this
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;
  //The way this works is - it takes all of the contacts in state
  //takes the name param in each input text box and matches it to the value field whcih is the same
  //ex example first text box name ="name" and value = {name} since both match we can key interpolate each item
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    //1.prevent the page from being refreshed
    e.preventDefault();
    //2. pass into the state -  passes in all the new feilds
    if (current === null){
      addContact(contact);
    }else {
        updateContact(contact)
    }
    //3. reset form  to default empty
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const clearAll = () =>{
    clearCurrent();
  }
  return (
    <form onSubmit={onSubmit}>
      {/* if you click edit the header changes to edit or add */}
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
        </div>}
    </form>
  );
};
export default ContactForm;
