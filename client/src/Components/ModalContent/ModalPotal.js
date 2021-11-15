import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function ModalPotal({ children }) {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: "";  top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);
  // id가 modal인 DOM 노드에 모달 창을 render합니다.
  const rootElement = document.getElementById('modal');
  return createPortal(children, rootElement);
}

ModalPotal.propTypes = {
  children: PropTypes.element,
};

export default ModalPotal;
