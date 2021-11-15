import React from 'react';

function RegisterPresenter({
  Email,
  Name,
  Password,
  VerifyPassword,
  onEmailHandler,
  onNameHandler,
  onPasswordHandler,
  onVerifyPasswordHandler,
  onSubmitHandler,
  moveToLogin,
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>VerifyPassword</label>
        <input type="password" value={VerifyPassword} onChange={onVerifyPasswordHandler} />
        <br />
        <button type="submit">Register</button>
        <button onClick={() => moveToLogin()}>Login</button>
      </form>
    </div>
  );
}

export default RegisterPresenter;
