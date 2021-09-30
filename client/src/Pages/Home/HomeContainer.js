import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import HomePresenter from "./HomePresenter";
import { getSubject } from "_actions/subject_actions";

function HomeContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { subject, user } = useSelector((state) => state);
  const { token } = user;
  const clickLogout = () => {
    axios.get("/api/logout").then(({ data: { success, message } }) => {
      if (success) {
        history.push("/login");
      } else {
        console.log(message);
        alert("Failed to logout");
      }
    });
  };
  useEffect(() => {
    dispatch(getSubject({ token }));
  }, []);
  return <HomePresenter clickLogout={clickLogout} subject={subject} />;
}

export default HomeContainer;
