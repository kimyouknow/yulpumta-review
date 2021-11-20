import InnerMenuWrapper from 'Components/InnerMenus/InnerMenuWrapper';
import StatInnerMenu from 'Components/InnerMenus/StatInnerMenu';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { extractTargetDate } from 'global/extractDate';
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
  background-color: ${(props) =>
    props.isCur < 0 ? 'grey' : props.isCur < 10 ? 'white' : 'rgba(238, 90, 36, 0.3)'};
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
`;

function StatPresenter({ calendar, calendarData, selectingDay }) {
  const { dailyTotalTimes, dailyLapses } = calendar;
  const { dates, year, month, setToday, prevMonth, nextMonth } = calendarData;
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
              onClick={(e) => selectingDay(date.date)}
              isCur={
                !date.isCur
                  ? -1
                  : dailyTotalTimes.length > 0
                  ? extractTargetDate(dailyTotalTimes, date.date)
                  : 0
              }
            >
              {date.date.getDate()}
            </DContent>
          ))}
      </DContainer>
      <InnerMenuWrapper>
        <StatInnerMenu dailyTotalTimes={dailyTotalTimes} dailyLapses={dailyLapses} />
      </InnerMenuWrapper>
    </>
  );
}

StatPresenter.propTypes = {
  calendar: PropTypes.shape({
    dailyTotalTimes: PropTypes.array,
  }),
  calendarData: PropTypes.shape({
    dates: PropTypes.array,
    year: PropTypes.number,
    month: PropTypes.number,
    setToday: PropTypes.func,
    prevMonth: PropTypes.func,
    nextMonth: PropTypes.func,
  }),
  selectingDay: PropTypes.func,
};

export default StatPresenter;
