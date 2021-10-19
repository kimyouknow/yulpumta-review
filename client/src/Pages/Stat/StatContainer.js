import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import StatPresenter from "./StatPresenter";
import useRenderCalendar from "_hooks/useRenderCalendar";

function StatContainer() {
  const dispatch = useDispatch();
  const { user, global } = useSelector((state) => state);
  const { token } = user;
  const { dates, year, month, setToday, prevMonth, nextMonth } =
    useRenderCalendar();
  const [dateInfo, setDateInfo] = useState([]);
  const getData = async () => {
    const {
      data: { success, message, data },
    } = await axios.post("/api/get-stat", {
      token,
      year,
      month,
    });
    if (!success) {
      console.log(message);
    } else {
      setDateInfo(data);
    }
  };
  useEffect(() => {
    getData();
  }, [year, month]);
  return (
    <StatPresenter
      dateInfo={dateInfo}
      calendarData={{ dates, year, month, setToday, prevMonth, nextMonth }}
    />
  );
}

export default StatContainer;
