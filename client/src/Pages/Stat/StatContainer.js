import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatPresenter from "./StatPresenter";
import useRenderCalendar from "_hooks/useRenderCalendar";
import { getTimeInfo, statSelectDay } from "_actions/calendar_actions";
import { extractDate } from "global/extractDate";

function StatContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const calendar = useSelector((state) => state.calendar);
  const { token } = user;
  const { statSelectedDate } = calendar;
  const { dates, year, month, setToday, prevMonth, nextMonth } =
    useRenderCalendar();
  const getData = useCallback(async () => {
    const body = {
      token,
      year,
      month,
    };
    console.log("getdata", year, month);
    dispatch(getTimeInfo(body));
    selectingDay(statSelectedDate);
  }, [year, month, dispatch, token]);
  const selectingDay = useCallback(
    (date) => {
      const { Y, M, D } = extractDate(date);
      const body = {
        token,
        Y,
        M,
        D,
      };
      dispatch(statSelectDay(body));
    },
    [token]
  );
  useEffect(() => {
    getData();
  }, [token, year, month]);
  console.log("container");
  return (
    <StatPresenter
      calendar={calendar}
      calendarData={{ dates, year, month, setToday, prevMonth, nextMonth }}
      selectingDay={selectingDay}
    />
  );
}

export default StatContainer;
