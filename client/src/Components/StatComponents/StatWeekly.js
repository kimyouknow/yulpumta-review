import React from "react";
import { useSelector } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { changeTimeFormat } from "global/extractDate";

function StatWeekly() {
  const { dailyTotalTimes, selectedDay } = useSelector(
    (state) => state.calendar
  );
  const activeMonth = selectedDay.getMonth();
  const activeDate = selectedDay.getDate();
  const activeDay = selectedDay.getDay();
  const barData = [];
  const barXaxis = [];
  for (let i = 0; i < 7; i++) {
    const thisWeek = activeDate + i - activeDay;
    barXaxis.push(thisWeek);
    if (thisWeek > 0 && thisWeek < 32) {
      barData.push({
        date: thisWeek,
        time: dailyTotalTimes[thisWeek - 1] / 60,
      });
    }
  }
  const weekTotalTime = barData.reduce(
    (acc, cur) => acc + cur.time,
    barData[0].time
  );
  return (
    <>
      <h2>
        {activeMonth + 1}월 {barXaxis[0]}일 ~ {activeMonth + 1}월{" "}
        {barXaxis[barXaxis.length - 1]}일
      </h2>
      <div>
        <h4>총 공부시간</h4>
        <span>{changeTimeFormat(weekTotalTime * 60)}</span>
      </div>
      <div>
        <h4>평균 공부시간</h4>
        <span>{changeTimeFormat(Math.ceil((weekTotalTime * 60) / 7))}</span>
      </div>
      <VictoryChart domainPadding={20}>
        <VictoryAxis tickValues={[...barXaxis]} tickFormat={(t) => `${t}일`} />
        <VictoryAxis
          dependentAxis
          domain={[0, 120]}
          tickFormat={(t) => `${t}분`}
        />
        <VictoryBar
          data={barData}
          x="date"
          y="time"
          style={{ data: { fill: "tomato", width: 4 } }}
        />
      </VictoryChart>
    </>
  );
}

export default StatWeekly;
