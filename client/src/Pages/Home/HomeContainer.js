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
  const { subject, user, global } = useSelector((state) => state);
  const { token } = user;
  const [ModalContent, setModalContent] = useState(null);
  const handleModal = useCallback(
    (text, subject) => () => {
      text === "add"
        ? setModalContent(<AddSubjectModal />)
        : setModalContent(<EditSubjectModal subject={subject} />);
      if (!global.isOpen) {
        dispatch(openModal());
      }
    },
    [dispatch, global]
  );
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
  }, [user]);
  console.log(subject);
  return (
    <HomePresenter
      subject={subject}
      global={global}
      ModalContent={ModalContent}
      clickLogout={clickLogout}
      handleModal={handleModal}
    />
  );
}

export default HomeContainer;
