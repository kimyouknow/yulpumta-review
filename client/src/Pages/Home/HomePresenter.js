import ErrModal from "Components/ModalContent/ErrModal";
import Modal from "Pages/Modal/Modal";
import React from "react";
// import PropTypes from "prop-types";

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
            <button onClick={() => handleModal("add")}>+</button>
            <span>과목추가</span>
          </li>
          {!subjects || error ? (
            <div>Loading...</div>
          ) : (
            subjects.map((subject) => (
              <li key={subject._id}>
                <span>{subject.title}</span>
                <span>{subject.color}</span>
                <button onClick={() => handleModal("edit", subject)}>
                  수정
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      {global.isOpen && (
        <Modal onClose={handleModal}>
          {global.errMsg ? <ErrModal /> : ModalContent}
        </Modal>
      )}
      {/* <div>Modal</div>
      </Modal> */}
    </div>
  );
}
export default HomePresenter;
