import React, { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { requestLogin } from "../redux/user/user.operations";
import { selectIsLoggedIn, selectUserStatus } from "../redux/selectors";

function LoginPage() {
  const status = useSelector(selectUserStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;

    navigate("/contacts");
  }, [navigate, isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    try {
      const response = await dispatch(requestLogin(formData)).unwrap();
      toast.success(`User ${response.user.name} successfully entered!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
  };

  return (
    <div>
      <h2>Login into your account!</h2>
      <form onSubmit={handleSubmit}>
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
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
