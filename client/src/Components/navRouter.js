import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrModal from 'Components/ModalContent/ErrModal';
import Modal from 'Pages/Modal';

function Nav() {
  const { global } = useSelector((state) => state);
  const { isOpen, errMsg, modalContent } = global;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/stat">통계</Link>
        </li>
        <li>
          <Link to="/planner">플래너</Link>
        </li>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/group">그룹</Link>
        </li>
        <li>
          <Link to="/rank">랭킹</Link>
        </li>
      </ul>
      {isOpen && <Modal>{errMsg ? <ErrModal msg={errMsg} /> : modalContent}</Modal>}
    </nav>
  );
}

export default Nav;
