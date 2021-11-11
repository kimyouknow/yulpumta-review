import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "_actions/global_actions";

function EditPlanModal() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date());
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const body = {
      token: user.token,
    };
    console.log(body);
    dispatch(closeModal());
  }, []);
  const handleDel = useCallback(async () => {
    const body = {
      token: user.token,
      subject_id: _id,
    };
    console.log(body);
    dispatch(closeModal());
  }, []);
  const onChangeTitle = useCallback((e) => setTitle(e.target.value), []);
  const onChangeDesc = useCallback((e) => setDesc(e.target.value), []);
  const onChangeDate = useCallback((e) => setDate(e.target.value), []);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={onChangeTitle}
        placeholder="할일"
      />
      <input
        type="text"
        value={desc}
        onChange={onChangeDesc}
        placeholder="설명"
      />
      <input
        type="date"
        value={date}
        onChange={onChangeDate}
        placeholder="색깔"
      />
      <button type="submit">수정</button>
      <span onClick={handleDel}>삭제</span>
    </form>
  );
}

EditPlanModal.propTypes = {};

export default EditPlanModal;
