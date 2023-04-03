import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { requestRegister } from "../redux/user/operations";
import { selectStatus } from "../redux/selectors";

function RegisterPage() {
  const status = useSelector(selectStatus);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    dispatch(requestRegister(formData)).unwrap().then((res) => {
        toast.success(`User ${res.user.name} successfully registered!`);
    }).catch((err) => {
        toast.error(`Oops! Something went wrong... ${err}`);
    });
  };

  return (
    <div>
      <h2>Register new account!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name:</p>
          <input
            type="text"
            ref={nameInputRef}
            name="userName"
            placeholder="Ivan Pupkin"
            required
          />
        </label>
        <label>
          <p>Email:</p>
          <input
            type="email"
            ref={emailInputRef}
            name="userEmail"
            placeholder="ivan_pupkin@gmail.com"
            required
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            ref={passwordInputRef}
            name="userPassword"
            minLength={7}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={status === "pending"}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
