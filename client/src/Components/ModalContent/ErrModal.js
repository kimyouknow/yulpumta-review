import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ErrModal() {
  const { global } = useSelector((state) => state);
  return <div>{global.errMsg}</div>;
}

ErrModal.propTypes = {};

export default ErrModal;
