import InnerMenuWrapper from "Components/InnerMenus/InnerMenuWrapper";
import StatInnerMenu from "Components/InnerMenus/StatInnerMenu";
import React from "react";
import styled from "styled-components";

const WContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
`;
const WContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
`;

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
  padding: 8px;
  position: relative;
  border: none;
  background-color: ${(props) =>
    props.isCur < 0
      ? "grey"
      : props.isCur < 10
      ? "white"
      : "rgba(238, 90, 36, 0.3)"};
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
`;

function StatPresenter({ calendar, calendarData }) {
  const { timeInfo } = calendar;
  const { dates, year, month, setToday, prevMonth, nextMonth } = calendarData;
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <>
      <div>
        <span>{year}년 </span>
        <span> {month + 1}월</span>
        <button onClick={prevMonth}>이전</button>
        <button onClick={setToday}>오늘</button>
        <button onClick={nextMonth}>이후</button>
      </div>
      <WContainer>
        {weeks.map((week) => (
          <WContent key={week}>{week}</WContent>
        ))}
      </WContainer>
      <DContainer>
        {dates &&
          timeInfo &&
          dates.map((date) => (
            <DContent
              key={date.date}
              isCur={date.isCur ? timeInfo[date.date.getDate() - 1] : -1}
            >
              {date.date.getDate()}
            </DContent>
          ))}
      </DContainer>
      <InnerMenuWrapper>
        <StatInnerMenu />
      </InnerMenuWrapper>
    </>
  );
}

export default StatPresenter;
