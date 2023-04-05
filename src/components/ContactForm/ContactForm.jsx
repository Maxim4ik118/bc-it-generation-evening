import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { requestAddContact } from "../../redux/contacts/contacts.operations";
import { toast } from "react-toastify";

function ContactForm() {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contact = {
      name: nameInputRef.current.value,
      number: phoneInputRef.current.value,
    };

    try {
      await dispatch(requestAddContact(contact)).unwrap();
      toast.success(`The contact was successfully added to your list!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
    reset();
  };

  const reset = () => {
    nameInputRef.current.value = "";
    phoneInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <label>
        <b>Name: </b>
        <input
          ref={nameInputRef}
          name="name"
          type="text"
          placeholder="Назва продукту"
          required
        />
      </label>
      <br />
      <label>
        <b>Phone: </b>
        <input
          name="phone"
          ref={phoneInputRef}
          type="text"
          placeholder="Ціна"
          required
        />
      </label>
      <br />

      <button type="submit">Додати контакт</button>
    </form>
  );
}

export default ContactForm;
