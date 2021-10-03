import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "_actions/subject_actions";

function AddSubjectModal(props) {
  const dispatch = useDispatch();
  const { subject, user } = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      token: user.token,
      title,
      color,
    };
    dispatch(addSubject(body));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. 수학, 영어, 과학.."
      />
      <input type="color" onChange={(e) => setColor(e.target.value)} />
      <button type="submit">추가</button>
    </form>
  );
}

AddSubjectModal.propTypes = {};

export default AddSubjectModal;
