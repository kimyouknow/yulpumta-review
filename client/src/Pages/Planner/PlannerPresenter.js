import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ToDos from 'Components/PlanComponents/ToDos';
import WeekContainer from 'Components/CalendarComponents/WeekContainer';
import CalendarHeader from 'Components/CalendarComponents/CalendarHeader';

const DContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 20px;
`;
const DContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  width: 100%;
  position: relative;
  border: none;
  background-color: ${(props) => (props.isCur ? 'wihte' : 'grey')};
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
`;

function PlannerPresenter({
  calendarData,
  handleAddSubject,
  handleEditSubject,
  selectingDay,
  monthPlans,
  stopPropagation,
}) {
  const { dates, year, month, setToday, prevMonth, nextMonth } = calendarData;
  const getDailyPlans = (date) => {
    if (monthPlans.length === 0) return [];
    return monthPlans[Number(date.toDateString().substring(8, 10)) - 1];
  };
  return (
    <>
      <CalendarHeader
        year={year}
        month={month}
        prevMonth={prevMonth}
        setToday={setToday}
        nextMonth={nextMonth}
      />
      <WeekContainer />
      <DContainer>
        {dates &&
          dates.map((date) => (
            <DContent
              key={date.date}
              isCur={date.isCur}
              onClick={(e) => selectingDay(e, date.date)}
            >
              {date.date.getDate()}
              {date.isCur && getDailyPlans(date.date).length !== 0 && (
                <ToDos
                  plans={getDailyPlans(date.date)}
                  onClick={stopPropagation}
                  handleEditSubject={handleEditSubject}
                />
              )}
            </DContent>
          ))}
      </DContainer>
      <div>
        <button onClick={handleAddSubject}>+</button>
      </div>
    </>
  );
}

PlannerPresenter.propTypes = {
  calendarData: PropTypes.shape({
    dates: PropTypes.array,
    year: PropTypes.number,
    month: PropTypes.number,
    setToday: PropTypes.func,
    prevMonth: PropTypes.func,
    nextMonth: PropTypes.func,
  }),
  handleAddSubject: PropTypes.func,
  handleEditSubject: PropTypes.func,
  selectingDay: PropTypes.func,
  monthPlans: PropTypes.arrayOf(PropTypes.array),
  stopPropagation: PropTypes.func,
};

export default PlannerPresenter;
