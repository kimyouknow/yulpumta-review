import React from "react";
import PropTypes from "prop-types";
import CounterWrapper from "Components/CounterWrapper";
import ErrModal from "Components/ModalContent/ErrModal";
import Modal from "Pages/Modal";

function ActivePresenter({ global, stopHandler, handleModal, subject }) {
  const { title, todayTotalT } = subject;
  return (
    <div>
      <CounterWrapper totalTime={todayTotalT}>
        <div>{title}</div>
      </CounterWrapper>
      <button onClick={stopHandler}>중지</button>
      {global.isOpen && global.errMsg && (
        <Modal onClose={handleModal}>
          <ErrModal msg={global.errMsg} />
        </Modal>
      )}
    </div>
  );
}

ActivePresenter.propTypes = {
  global: PropTypes.shape({
    isOpen: PropTypes.bool,
    errMsg: PropTypes.string,
  }),
  count: PropTypes.number,
  handleModal: PropTypes.func,
};

export default ActivePresenter;
