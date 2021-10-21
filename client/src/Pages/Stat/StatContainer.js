import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatPresenter from "./StatPresenter";
import useRenderCalendar from "_hooks/useRenderCalendar";
import { getTimeInfo } from "_actions/calendar_actions";

function StatContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const calendar = useSelector((state) => state.calendar);
  const { token } = user;
  const { dates, year, month, setToday, prevMonth, nextMonth } =
    useRenderCalendar();
  const getData = async () => {
    const body = {
      token,
      year,
      month,
    };
    console.log("getData", month);
    dispatch(getTimeInfo(body));
  };
  useEffect(() => {
    getData();
  }, [year, month]);
  console.log("container");
  return (
    <StatPresenter
      calendar={calendar}
      calendarData={{ dates, year, month, setToday, prevMonth, nextMonth }}
    />
  );
}

export default StatContainer;
