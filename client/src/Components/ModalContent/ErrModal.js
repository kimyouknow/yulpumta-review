import React from "react";
import PropTypes from "prop-types";

function ErrModal({ msg }) {
  return <div>{msg}</div>;
}

ErrModal.propTypes = {
  msg: PropTypes.string,
};

export default ErrModal;
