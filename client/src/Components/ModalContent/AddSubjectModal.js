import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "_actions/subject_actions";
import { closeModal } from "_actions/global_actions";

function AddSubjectModal() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      token: user.token,
      title,
      color,
    };
    await dispatch(addSubject(body));
    dispatch(closeModal());
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. 수학, 영어, 과학.."
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="색깔"
      />
      <button type="submit">추가</button>
    </form>
  );
}

AddSubjectModal.propTypes = {};

export default AddSubjectModal;
