import { extractTargetDate } from "global/extractDate";
import React from "react";
import { useSelector } from "react-redux";

function StatDaily() {
  const { dailyTotalTimes, selectedDay, dailyLapses } = useSelector(
    (state) => state.calendar
  );
  // const targetDay = new Date(Y, M, D);
  console.log(dailyTotalTimes, selectedDay, dailyLapses);
  return (
    <>
      <div>
        <h4>총 공부시간</h4>
        <span>{extractTargetDate(dailyTotalTimes, selectedDay)}</span>
      </div>
      <div>
        <h4>최대 집중 시간</h4>
        <span></span>
      </div>
      <div>
        <h4>시작 시간</h4>
        <span></span>
      </div>
      <div>
        <h4>종료시간</h4>
        <span></span>
      </div>
    </>
  );
}

export default StatDaily;
