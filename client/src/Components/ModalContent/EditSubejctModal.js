import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubject, editSubject } from '_actions/subject_actions';
import { closeModal } from '_actions/global_actions';

function EditSubjectModal({ subject }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { _id, color: pre_color, title: pre_title } = subject;
  const [title, setTitle] = useState(pre_title);
  const [color, setColor] = useState(pre_color);
  console.log(subject);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        token: user.token,
        subject_id: _id,
        title,
        color,
      };
      await dispatch(editSubject(body));
      dispatch(closeModal());
    },
    [user, _id, title, color, dispatch],
  );
  const handleDel = useCallback(async () => {
    const body = {
      token: user.token,
      subject_id: _id,
    };
    await dispatch(deleteSubject(body));
    dispatch(closeModal());
  }, [user, _id, dispatch]);
  const onChangeTitle = useCallback((e) => setTitle(e.target.value), []);
  const onChangeColor = useCallback((e) => setColor(e.target.value), []);
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={onChangeTitle} placeholder="과목" />
      <input type="text" value={color} onChange={onChangeColor} placeholder="색깔" />
      <button type="submit">수정</button>
      <span onClick={handleDel}>삭제</span>
    </form>
  );
}

EditSubjectModal.propTypes = {
  subject: PropTypes.shape({
    _id: PropTypes.string,
    color: PropTypes.string,
    user_id: PropTypes.string,
    lapses: PropTypes.array,
  }),
};

export default EditSubjectModal;
