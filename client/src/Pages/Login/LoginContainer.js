import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { loginUser } from "_actions/user_actions";
import LoginPresenter from "./LoginPresenter";

function LoginContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const moveToRegister = () => history.push("/register");
  const onEmailHandler = (e) => setEmail(e.currentTarget.value);

  const onPasswordHandler = (e) => setPassword(e.currentTarget.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log('Email: ', Email);
    // console.log('Password: ', Password);
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then(({ payload: { success, message } }) => {
      if (!success) return alert(message);
      history.push("/");
    });
  };
  return (
    <LoginPresenter
      Email={Email}
      Password={Password}
      onEmailHandler={onEmailHandler}
      onPasswordHandler={onPasswordHandler}
      onSubmitHandler={onSubmitHandler}
      moveToRegister={moveToRegister}
    />
  );
}

export default LoginContainer;
