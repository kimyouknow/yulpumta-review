import AddPlanModal from "Components/ModalContent/AddPlanModal";
import { extractDate } from "global/extractDate";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlans, planSelectDay } from "_actions/calendar_actions";
import { openModal } from "_actions/global_actions";
import useRenderCalendar from "_hooks/useRenderCalendar";
import PlannerPresenter from "./PlannerPresenter";

function PlannerContainer() {
  const { dates, year, month, setToday, prevMonth, nextMonth } =
    useRenderCalendar();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const calendar = useSelector((state) => state.calendar);
  const { planSelectedDate } = calendar;
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
  const initGetPlans = () => {
    console.log("init get plans");
    const { Y, M, D } = extractDate(planSelectedDate);
    const body = {
      token: user.token,
      Y,
      M,
      D,
    };
    dispatch(getPlans(body));
  };
  useEffect(() => {
    initGetPlans();
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
