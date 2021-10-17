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
  const getData = async () => {
    const request = await axios.post("/api/get-stat", { token });
    console.log(request);
  };
  useEffect(() => {
    getData();
  }, [year, month]);
  return (
    <StatPresenter
      calendarData={{ dates, year, month, setToday, prevMonth, nextMonth }}
    />
  );
}

export default StatContainer;
