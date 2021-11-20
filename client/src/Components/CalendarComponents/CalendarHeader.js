import React from 'react';
import PropTypes from 'prop-types';

const CalendarHeader = ({ year, month, prevMonth, setToday, nextMonth }) => {
  return (
    <div>
      <span>{year}년 </span>
      <span> {month + 1}월</span>
      <button onClick={prevMonth}>이전</button>
      <button onClick={setToday}>오늘</button>
      <button onClick={nextMonth}>이후</button>
    </div>
  );
};

CalendarHeader.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  prevMonth: PropTypes.func,
  setToday: PropTypes.func,
  nextMonth: PropTypes.func,
};

export default CalendarHeader;
