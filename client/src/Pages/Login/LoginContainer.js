import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { catchError } from '_actions/global_actions';
import { loginUser } from '_actions/user_actions';
import LoginPresenter from './LoginPresenter';

function LoginContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const moveToRegister = useCallback(() => history.push('/register'), [history]);
  const onEmailHandler = useCallback((e) => setEmail(e.currentTarget.value), []);

  const onPasswordHandler = useCallback((e) => setPassword(e.currentTarget.value), []);
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      // console.log('Email: ', Email);
      // console.log('Password: ', Password);
      let body = {
        email: Email,
        password: Password,
      };
      dispatch(loginUser(body)).then(({ payload: { success, message } }) => {
        if (!success) return dispatch(catchError(message));
        history.push('/');
      });
    },
    [Email, Password, dispatch, history],
  );
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
