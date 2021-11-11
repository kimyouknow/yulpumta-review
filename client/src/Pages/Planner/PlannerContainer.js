import React from "react";
import useRenderCalendar from "_hooks/useRenderCalendar";
import PlannerPresenter from "./PlannerPresenter";

function PlannerContainer() {
  const { dates, year, month, setToday, prevMonth, nextMonth } =
    useRenderCalendar();
  return (
    <PlannerPresenter
      calendarData={{ dates, year, month, setToday, prevMonth, nextMonth }}
    />
  );
}

export default PlannerContainer;
