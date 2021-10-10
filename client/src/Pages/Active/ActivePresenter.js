import React from "react";
import PropTypes from "prop-types";
import CounterWrapper from "Components/CounterWrapper";
import Modal from "Pages/Modal/Modal";
import ErrModal from "Components/ModalContent/ErrModal";

function ActivePresenter({ global, stopHandler, handleModal }) {
  return (
    <div>
      <CounterWrapper global={global}>
        <div>hello</div>
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
