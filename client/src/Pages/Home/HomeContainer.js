import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import HomePresenter from "./HomePresenter";
import { getSubject } from "_actions/subject_actions";
import { catchError, openModal } from "_actions/global_actions";
import AddSubjectModal from "Components/ModalContent/AddSubjectModal";
import EditSubjectModal from "Components/ModalContent/EditSubejctModal";

function HomeContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { subject } = useSelector((state) => state);
  const { token } = user;
  const handleEditSubject = useCallback((targetSubject) => {
    dispatch(openModal(<EditSubjectModal subject={targetSubject} />));
  }, []);
  const handleAddSubject = useCallback(() => {
    dispatch(openModal(<AddSubjectModal />));
  }, []);
  const clickLogout = useCallback(() => {
    axios.get("/api/logout").then(({ data: { success, message } }) => {
      if (success) {
        history.push("/login");
      } else {
        dispatch(catchError(message));
      }
    });
  }, [dispatch, history]);
  useEffect(() => {
    if (token) {
      dispatch(getSubject({ token }));
    }
  }, []);
  return (
    <HomePresenter
      subject={subject}
      clickLogout={clickLogout}
      handleEditSubject={handleEditSubject}
      handleAddSubject={handleAddSubject}
    />
  );
}

export default HomeContainer;
