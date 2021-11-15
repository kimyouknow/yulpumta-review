import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '_actions/global_actions';
import { addPlan } from '_actions/calendar_actions';

function AddPlanModal({ targetDate }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState({
    Y: targetDate.getFullYear(),
    M: targetDate.getMonth(),
    D: targetDate.getDate(),
  });
  const { Y, M, D } = date;
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        token: user.token,
        title,
        desc,
        date,
      };
      console.log(body);
      dispatch(addPlan(body));
      dispatch(closeModal());
    },
    [user, title, desc, date, dispatch],
  );
  const onChangeTitle = useCallback((e) => setTitle(e.target.value), []);
  const onChangeDesc = useCallback((e) => setDesc(e.target.value), []);
  const onChangeDate = useCallback((e) => {
    const value = e.target.value;
    const Y = Number(value.slice(0, 4));
    const M = Number(value.slice(5, 7)) - 1;
    const D = Number(value.slice(8, 10));
    setDate({ Y, M, D });
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={onChangeTitle} placeholder="할일" />
      <input type="text" value={desc} onChange={onChangeDesc} placeholder="설명" />
      <input
        type="date"
        value={new Date(Y, M, D + 1).toISOString().substring(0, 10)}
        onChange={onChangeDate}
        placeholder="날짜"
      />
      <button type="submit">추가</button>
    </form>
  );
}

AddPlanModal.propTypes = {
  targetDate: PropTypes.object,
};

export default AddPlanModal;
