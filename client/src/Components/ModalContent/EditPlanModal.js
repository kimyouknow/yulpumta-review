import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '_actions/global_actions';
import { checkPlan, delPlan, editPlan } from '_actions/calendar_actions';

function EditPlanModal({ plan }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { date, p_desc, p_title, p_isDone, _id } = plan;
  const targetDate = Number(String(date).substring(6, 8));
  const [title, setTitle] = useState(p_title);
  const [desc, setDesc] = useState(p_desc);
  const [isDone, setIsDone] = useState(p_isDone);
  const handleEdit = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        token: user.token,
        plan_id: _id,
        title,
        desc,
        targetDate,
      };
      console.log(body);
      dispatch(editPlan(body));
      dispatch(closeModal());
    },
    [dispatch, desc, title, _id],
  );
  const handleDel = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        token: user.token,
        plan_id: _id,
        targetDate,
      };
      console.log(body);
      dispatch(delPlan(body));
      dispatch(closeModal());
    },
    [dispatch, _id],
  );
  const handleCheck = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        token: user.token,
        plan_id: _id,
        isDone,
        targetDate,
      };
      console.log(body);
      dispatch(checkPlan(body));
      dispatch(closeModal());
    },
    [dispatch, _id, isDone],
  );
  const onChangeTitle = useCallback((e) => setTitle(e.target.value), []);
  const onChangeDesc = useCallback((e) => setDesc(e.target.value), []);
  return (
    <form>
      <input type="text" value={title} onChange={onChangeTitle} placeholder="할일" />
      <input type="text" value={desc} onChange={onChangeDesc} placeholder="설명" />
      <button onClick={handleDel}>삭제</button>
      <button onClick={handleCheck}>{isDone ? '취소' : '완료'}</button>
      <button onClick={handleEdit}>수정</button>
    </form>
  );
}

EditPlanModal.propTypes = {
  plan: PropTypes.shape({
    user_id: PropTypes.string,
    _id: PropTypes.string,
    date: PropTypes.number,
    p_title: PropTypes.string,
    p_date: PropTypes.string,
    p_desc: PropTypes.string,
    p_isDone: PropTypes.bool,
  }),
};

export default EditPlanModal;
