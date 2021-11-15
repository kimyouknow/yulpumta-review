import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubject } from '_actions/subject_actions';
import { closeModal } from '_actions/global_actions';

function AddSubjectModal() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        token: user.token,
        title,
        color,
      };
      await dispatch(addSubject(body));
      dispatch(closeModal());
    },
    [user, title, color, dispatch],
  );
  const onChangeTitle = useCallback((e) => setTitle(e.target.value), []);
  const onChangeColor = useCallback((e) => setColor(e.target.value), []);
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={onChangeTitle} placeholder="e.g. 수학, 영어, 과학.." />
      <input type="text" value={color} onChange={onChangeColor} placeholder="색깔" />
      <button type="submit">추가</button>
    </form>
  );
}

export default AddSubjectModal;
