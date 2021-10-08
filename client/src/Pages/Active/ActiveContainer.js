import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { recordSubejct } from "_actions/subject_actions";
import ActivePresenter from "./ActivePresenter";

function ActiveContainer() {
  const { subject, user, global } = useSelector((state) => state);
  const { token } = user;
  const dispatch = useDispatch();
  // const history = useHistory();
  const { state } = useLocation();
  const [startTime, setStartTime] = useState(new Date());
  const stopHandler = async () => {
    const endTime = new Date();
    const body = {
      token: "asdfasdfasdf",
      subject_id: state._id,
      startTime,
      endTime,
      lapse: Math.floor((endTime.getTime() - startTime.getTime()) / 1000),
    };
    console.log(body);
    dispatch(recordSubejct(body));
    // if (!global.isOpen) {
    //   history.push("/");
    // }
  };

  return <ActivePresenter stopHandler={stopHandler} />;
}

export default ActiveContainer;
