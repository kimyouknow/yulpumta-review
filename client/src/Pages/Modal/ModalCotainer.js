import React from 'react';
import PropTypes from 'prop-types';
import ModalPresenter from './ModalPresenter';
import { useDispatch } from 'react-redux';
import { closeModal } from '_actions/global_actions';

function ModalCotainer({ children, overlayClose = true }) {
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
  return <ModalPresenter children={children} onOverlayClick={onOverlayClick} handleCloseModal={handleCloseModal} />;
}

ModalCotainer.propTypes = {
  overlayClose: PropTypes.bool,
  children: PropTypes.element,
};

export default ModalCotainer;
