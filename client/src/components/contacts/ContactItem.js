import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";
export const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  //destrucre our contacts
  const { id, name, email, phone, type } = contact;

  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  //will take in the ID
  const onDelete = () => {
    //function called deleteContact that comes in from the context
    deleteContact(id);
    //clear the current contact
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone-open"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        {/* the current contact is a prop being passed into this component upon hitting edit it passes that contact to the function  */}
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;
