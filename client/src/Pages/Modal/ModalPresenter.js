import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ModalPotal from "Components/ModalContent/ModalPotal";

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #c8c8c8;
  opacity: 0.5;
  z-index: 99;
  overflow: hidden;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 400px;
  height: 400px;
  background-color: #fff;
`;

function Modal({ children, onOverlayClick, handleCloseModal }) {
  return (
    <ModalPotal>
      <>
        <Overlay onClick={onOverlayClick} />
        <Wrapper>
          <button onClick={handleCloseModal}>x</button>
          <div>{children}</div>
        </Wrapper>
      </>
    </ModalPotal>
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  onOverlayClick: PropTypes.func,
  handleCloseModal: PropTypes.func,
};

export default Modal;
