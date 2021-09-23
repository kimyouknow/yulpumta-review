import React from "react";

function LoginPresenter({
  Email,
  Password,
  onEmailHandler,
  onPasswordHandler,
  onSubmitHandler,
  moveToRegister,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
        <button onClick={() => moveToRegister()}>Register</button>
      </form>
    </div>
  );
}

export default LoginPresenter;
