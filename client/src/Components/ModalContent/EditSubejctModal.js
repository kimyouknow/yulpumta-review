import React, { useState } from "react";
import PropTypes from "prop-types";

function EditSubjectModal(props) {
  const [Title, setTitle] = useState("");
  const [Color, setColor] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Title, Color);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="target"
      />
    </form>
  );
}

EditSubjectModal.propTypes = {};

export default EditSubjectModal;
