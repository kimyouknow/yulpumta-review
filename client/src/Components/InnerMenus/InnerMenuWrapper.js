import React from "react";
import PropTypes from "prop-types";

function InnerMenu({ children }) {
  return <div>{children}</div>;
}

InnerMenu.propTypes = {
  children: PropTypes.element.isRequired,
};

export default InnerMenu;
