import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { catchError, openModal } from "_actions/global_actions";
import { recordSubejct } from "_actions/subject_actions";
import ActivePresenter from "./ActivePresenter";

function ActiveContainer() {
  const { user, global } = useSelector((state) => state);
  const { token } = user;
  const dispatch = useDispatch();
  const handleModal = () => {
    if (!global.isOpen) {
      dispatch(openModal());
    }
  };
  const history = useHistory();
  const { state } = useLocation();
  const [startTime, setStartTime] = useState(new Date());
  const stopHandler = async () => {
    const endTime = new Date();
    const body = {
      token,
      subject_id: state._id,
      startTime,
      endTime,
      lapse: Math.floor((endTime.getTime() - startTime.getTime()) / 1000),
    };
    const {
      payload: {
        data: { success, message },
      },
    } = await dispatch(recordSubejct(body));
    if (!success) return dispatch(catchError(message));
    history.push("/");
  };
  return (
    <ActivePresenter
      global={global}
      stopHandler={stopHandler}
      handleModal={handleModal}
    />
  );
}

export default ActiveContainer;
