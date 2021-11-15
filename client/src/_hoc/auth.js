import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '_actions/user_actions';

export default function AuthHOC(SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        const { isAuth } = response.payload;
        if (!isAuth) {
          // 로그인 하지 않는 상태
          if (option) {
            props.history.push('/login');
          }
        } else {
          if (option === false) {
            props.history.push('/');
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
