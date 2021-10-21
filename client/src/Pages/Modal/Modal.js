import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { closeModal } from "_actions/global_actions";

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

export const Portal = ({ children }) => {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: "";  top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  // id가 modal인 DOM 노드에 모달 창을 render합니다.
  const rootElement = document.getElementById("modal");
  return createPortal(children, rootElement);
};

function Modal({ children, overlayClose = true }) {
  const dispatch = useDispatch();
  // 바깥 영역을 클릭 시, 모달 창을 닫을 지 여부
  const onOverlayClick = () => {
    if (overlayClose) {
      handleCloseModal();
    }
  };
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Portal>
      <Overlay onClick={onOverlayClick} />
      <Wrapper>
        <button onClick={handleCloseModal}>x</button>
        <div>{children}</div>
      </Wrapper>
    </Portal>
  );
}

Modal.propTypes = {
  overlayClose: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default Modal;
