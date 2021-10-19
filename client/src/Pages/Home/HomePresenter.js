import ErrModal from "Components/ModalContent/ErrModal";
import Modal from "Pages/Modal/Modal";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HomePresenter({
  subject,
  global,
  ModalContent,
  clickLogout,
  handleModal,
}) {
  const { subjects, error } = subject;
  return (
    <div>
      <button onClick={() => clickLogout()}>logout</button>
      <div>
        <h1>Timer</h1>
      </div>
      <div>
        <h1>Subjects</h1>
        <ul>
          <li>
            <button onClick={handleModal("add")}>+</button>
            <span>과목추가</span>
          </li>
          {!subjects || error ? (
            <div>Loading...</div>
          ) : (
            subjects.map((subject) => (
              <li key={subject._id}>
                <Link to={{ pathname: "/active", state: { subject } }}>
                  <button>기록</button>
                </Link>
                <span>{subject.title}</span>
                <span> | </span>
                <span>{subject.todayTotalT}</span>
                <button onClick={handleModal("edit", subject)}>수정</button>
              </li>
            ))
          )}
        </ul>
      </div>
      {global.isOpen && (
        <Modal>
          {global.errMsg ? <ErrModal msg={global.errMsg} /> : ModalContent}
        </Modal>
      )}
    </div>
  );
}

HomePresenter.propTypes = {
  subject: PropTypes.shape({
    _id: PropTypes.string,
    color: PropTypes.string,
    user_id: PropTypes.string,
    lapses: PropTypes.array,
  }),
  global: PropTypes.shape({
    isOpen: PropTypes.bool,
    errMsg: PropTypes.string,
  }),
  ModalContent: PropTypes.element,
  clickLogout: PropTypes.func,
  handleModal: PropTypes.func,
};

export default HomePresenter;
