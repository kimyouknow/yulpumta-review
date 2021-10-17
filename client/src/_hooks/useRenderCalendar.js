import { useCallback, useEffect, useState } from "react";

const useRenderCalendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [dates, setDates] = useState([]);
  const setToday = useCallback(() => {
    const newDate = new Date();
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  }, []);
  const prevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(month + 11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
      setYear(year);
    }
  }, [year, month]);
  const nextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(month - 11);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
      setYear(year);
    }
  }, [year, month]);
  const renderDate = useCallback((year, month) => {
    const preLast = new Date(year, month, 0);
    const currentLast = new Date(year, month + 1, 0);
    const PLDate = preLast.getDate();
    const PLDay = preLast.getDay();
    const CLDate = currentLast.getDate();
    const CLDay = currentLast.getDay();
    const PDates = [];
    const CDates = [];
    const NDates = [];
    for (let i = 1; i < CLDate + 1; i++) {
      // const i_date = new Date(activeY, activeM, i);
      CDates.push({
        date: new Date(year, month, i),
        totalTime: 0,
        isCur: true,
      });
    }
    // Sunday - Saturday : 0 - 6
    if (PLDay !== 6) {
      for (let i = PLDay; i >= 0; i--) {
        PDates.push({
          date: new Date(year, month - 1, PLDate - i),
          totalTime: -1,
          isCur: false,
        });
      }
    }
    if (CLDay !== 6) {
      for (let i = 1; i <= 6 - CLDay; i++) {
        NDates.push({
          date: new Date(year, month + 1, i),
          totalTime: -1,
          isCur: false,
        });
      }
    }
    setDates(PDates.concat(CDates, NDates));
  }, []);
  useEffect(() => {
    renderDate(year, month);
  }, [year, month]);
  return { dates, year, month, setToday, prevMonth, nextMonth };
};

export default useRenderCalendar;
