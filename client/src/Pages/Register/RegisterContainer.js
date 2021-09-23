import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { registerUser } from "_actions/user_actions";
import RegisterPresenter from "./RegisterPresenter";

function RegisterContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [VerifyPassword, setVerifyPassword] = useState("");
  const moveToLogin = () => history.push("/login");
  const onEmailHandler = (e) => setEmail(e.currentTarget.value);
  const onNameHandler = (e) => setName(e.currentTarget.value);
  const onPasswordHandler = (e) => setPassword(e.currentTarget.value);
  const onVerifyPasswordHandler = (e) =>
    setVerifyPassword(e.currentTarget.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Password !== VerifyPassword) {
      alert("비빌번호를 확인하세요");
      return;
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    dispatch(registerUser(body)).then(({ payload: { success, message } }) => {
      if (!success) return alert(message);
      history.push("/login");
    });
  };
  return (
    <RegisterPresenter
      Email={Email}
      Name={Name}
      Password={Password}
      VerifyPassword={VerifyPassword}
      onEmailHandler={onEmailHandler}
      onNameHandler={onNameHandler}
      onPasswordHandler={onPasswordHandler}
      onVerifyPasswordHandler={onVerifyPasswordHandler}
      onSubmitHandler={onSubmitHandler}
      moveToLogin={moveToLogin}
    />
  );
}

export default RegisterContainer;
