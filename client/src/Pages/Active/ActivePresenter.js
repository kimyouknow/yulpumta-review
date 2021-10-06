import React from "react";
import PropTypes from "prop-types";

function ActivePresenter({ count, stopHandler }) {
  return (
    <div>
      <h3>{count}</h3>
      <button onClick={stopHandler}>중지</button>
    </div>
  );
}

ActivePresenter.propTypes = {
  count: PropTypes.number,
};

export default ActivePresenter;
