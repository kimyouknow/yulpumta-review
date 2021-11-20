import AddPlanModal from 'Components/ModalContent/AddPlanModal';
import EditPlanModal from 'Components/ModalContent/EditPlanModal';
import { extractDate } from 'global/extractDate';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans, planSelectDay } from '_actions/calendar_actions';
import { openModal } from '_actions/global_actions';
import useRenderCalendar from '_hooks/useRenderCalendar';
import PlannerPresenter from './PlannerPresenter';

function PlannerContainer() {
  const { dates, year, month, setToday, prevMonth, nextMonth } = useRenderCalendar();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const calendar = useSelector((state) => state.calendar);
  const { planSelectedDate, monthPlans } = calendar;
  const handleAddSubject = useCallback(() => {
    dispatch(openModal(<AddPlanModal targetDate={planSelectedDate} />));
  }, [planSelectedDate]);
  const handleEditSubject = useCallback(
    (targetPlan) => {
      dispatch(openModal(<EditPlanModal plan={targetPlan} />));
    },
    [prevMonth, nextMonth, setToday, dispatch],
  );
  const selectingDay = useCallback(
    (e, date) => {
      const { Y, M, D } = extractDate(date);
      const body = {
        Y,
        M,
        D,
      };
      dispatch(planSelectDay(body));
    },
    [dispatch],
  );
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const initGetPlans = useCallback(() => {
    console.log('init get plans');
    const { Y, M, D } = extractDate(new Date(year, month, 1));
    const body = {
      token: user.token,
      Y,
      M,
      D,
    };
    console.log(body);
    dispatch(getPlans(body));
  }, [prevMonth, nextMonth, setToday]);
  useEffect(() => {
    initGetPlans();
  }, [prevMonth, nextMonth, setToday]);
  console.log(year, month, monthPlans);
  return (
    <PlannerPresenter
      calendarData={{ dates, year, month, setToday, prevMonth, nextMonth }}
      handleAddSubject={handleAddSubject}
      handleEditSubject={handleEditSubject}
      selectingDay={selectingDay}
      monthPlans={monthPlans}
      stopPropagation={stopPropagation}
    />
  );
}

export default PlannerContainer;
