import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ActivePresenter from "./ActivePresenter";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function ActiveContainer() {
  const { subject, user, global } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const stopHandler = () => {
    console.log("stop");
    setIsRunning(!isRunning);
  };
  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? 1000 : null
  );
  return <ActivePresenter count={count} stopHandler={stopHandler} />;
}

export default ActiveContainer;
