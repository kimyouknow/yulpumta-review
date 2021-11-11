import AddPlanModal from "Components/ModalContent/AddPlanModal";
import { extractDate } from "global/extractDate";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { planSelectDay } from "_actions/calendar_actions";
import { openModal } from "_actions/global_actions";
import useRenderCalendar from "_hooks/useRenderCalendar";
import PlannerPresenter from "./PlannerPresenter";

function PlannerContainer() {
  const { dates, year, month, setToday, prevMonth, nextMonth } =
    useRenderCalendar();
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state.calendar);
  const { planSelectedDate } = calendar;
  console.log(planSelectedDate);
  const handleAddSubject = useCallback(() => {
    dispatch(openModal(<AddPlanModal targetDate={planSelectedDate} />));
  }, [planSelectedDate]);
  const selectingDay = useCallback((date) => {
    const { Y, M, D } = extractDate(date);
    const body = {
      Y,
      M,
      D,
    };
    dispatch(planSelectDay(body));
  }, []);
  return (
    <PlannerPresenter
      calendarData={{ dates, year, month, setToday, prevMonth, nextMonth }}
      handleAddSubject={handleAddSubject}
      selectingDay={selectingDay}
    />
  );
}

export default PlannerContainer;
