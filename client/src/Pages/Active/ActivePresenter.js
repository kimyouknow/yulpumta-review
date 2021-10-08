import React from "react";
import PropTypes from "prop-types";
import CounterWrapper from "Components/CounterWrapper";

function ActivePresenter({ stopHandler }) {
  console.log("presenter");
  return (
    <div>
      <CounterWrapper>
        <div>hello</div>
      </CounterWrapper>
      <button onClick={stopHandler}>중지</button>
    </div>
  );
}

ActivePresenter.propTypes = {
  count: PropTypes.number,
};

export default ActivePresenter;
