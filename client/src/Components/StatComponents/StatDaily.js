import { displayClock, extractTargetDate } from 'global/extractDate';
import React from 'react';
import { useSelector } from 'react-redux';

function StatDaily() {
  const { dailyTotalTimes, statSelectedDate, dailyLapses } = useSelector((state) => state.calendar);
  const MaxLapse = dailyLapses.reduce((acc, cur) => (acc > cur.l_lapse ? acc : cur.l_lapse), dailyLapses[0]);
  const startTime = dailyLapses[0].l_start_time;
  const filtered = dailyLapses.filter((ele) => ele.l_lapse !== 0);
  const endTime = filtered[filtered.length - 1].l_end_time;
  return (
    <>
      <div>
        <h4>총 공부시간</h4>
        <span>{extractTargetDate(dailyTotalTimes, statSelectedDate)}</span>
      </div>
      <div>
        <h4>최대 집중 시간</h4>
        <span>{MaxLapse}</span>
      </div>
      <div>
        <h4>시작 시간</h4>
        <span>{displayClock(startTime)}</span>
      </div>
      <div>
        <h4>종료시간</h4>
        <span>{displayClock(endTime)}</span>
      </div>
      <div>
        <ul>
          {filtered &&
            filtered.map((lapse) => (
              <li key={lapse._id}>
                <h2>{lapse.subject_title}</h2>
                <span>{displayClock(lapse.l_start_time)}</span>
                <hr />
                <span>{displayClock(lapse.l_end_time)}</span>
                <span>{lapse.l_lapse}</span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default StatDaily;
