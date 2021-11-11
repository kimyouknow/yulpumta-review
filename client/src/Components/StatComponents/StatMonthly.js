import { changeTimeFormat } from "global/extractDate";
import React from "react";
import { useSelector } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

function StatMonthly() {
  const { dailyTotalTimes, statSelectedDate } = useSelector(
    (state) => state.calendar
  );
  const activeYear = statSelectedDate.getFullYear();
  const activeMonth = statSelectedDate.getMonth() + 1;
  const barData = [];
  for (let i = 0; i < dailyTotalTimes.length; i++) {
    barData.push({
      date: new Date(i + 1).getDate(),
      time: dailyTotalTimes[i] / 60,
    });
  }
  const monthTotalTime = barData.reduce(
    (acc, cur) => acc + cur.time,
    barData[0].time
  );
  return (
    <div>
      <div>
        <h4>총 공부시간</h4>
        <span>{changeTimeFormat(monthTotalTime * 60)}</span>
      </div>
      <div>
        <h4>평균 공부시간</h4>
        <span>{changeTimeFormat(Math.ceil((monthTotalTime * 60) / 30))}</span>
      </div>
      <VictoryChart domainPadding={20}>
        <VictoryAxis
          domain={[0, new Date(activeYear, activeMonth, 0).getDate()]}
          tickFormat={(t) => `${t}일`}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 120]}
          tickFormat={(t) => `${t}분`}
        />
        <VictoryBar data={barData} x="date" y="time" barWidth={4} />
      </VictoryChart>
    </div>
  );
}

export default StatMonthly;
