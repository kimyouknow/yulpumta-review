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
  // const reset = useCallback(() => {
  //   setCount(0);
  // }, []);
  return { count, start, stop };
}

function CounterWrapper({ totalTime, children }) {
  const { count, start, stop } = useCounter();
  useEffect(() => {
    start();
    return () => stop();
  }, []);
  return (
    <div className={"wrapper"}>
      <div>{count + totalTime}</div>
      <div>{children}</div>
    </div>
  );
}
CounterWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CounterWrapper;
