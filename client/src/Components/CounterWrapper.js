import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function CounterWrapper({ children }) {
  const [count, setCount] = useState(0);
  const intervalRef = useRef();
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    intervalRef.current = id;
    return () => clearInterval(intervalRef.current);
  });
  return (
    <div className={"wrapper"}>
      <div>{count}</div>
      <div>{children}</div>
    </div>
  );
}
CounterWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CounterWrapper;
// export function useInterval(callback, delay) {
//   const savedCallback = useRef();
//   console.log("useInterval");
//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }
