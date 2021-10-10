import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function useCounter() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setCount(0);
  }, []);
  return { count, start, stop, reset };
}

function CounterWrapper({ global, children }) {
  const { count, start, stop, reset } = useCounter();
  useEffect(() => {
    start();
    return () => stop();
  }, []);
  return (
    <div className={"wrapper"}>
      <div>{count}</div>
      <div>{children}</div>
    </div>
  );
}
CounterWrapper.propTypes = {
  global: PropTypes.shape({
    isOpen: PropTypes.bool,
    errMsg: PropTypes.string,
  }),
  children: PropTypes.element.isRequired,
};

export default CounterWrapper;
// const [count, setCount] = useState(0);
// const intervalRef = useRef();
// useEffect(() => {
//   const id = setInterval(() => {
//     setCount(count + 1);
//   }, 1000);
//   intervalRef.current = id;
//   return () => clearInterval(intervalRef.current);
// });
