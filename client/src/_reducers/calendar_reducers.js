import {
  GET_TOTAL_TIME,
  PLAN_SELECT_DAY,
  STAT_SELECT_DAY,
} from "_actions/types";

const initState = {
  dailyTotalTimes: [],
  dailyLapses: [],
  statSelectedDate: new Date(),
  planSelectedDate: new Date(),
};

const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TOTAL_TIME:
      return { ...state, dailyTotalTimes: action.payload };
    case STAT_SELECT_DAY:
      const { Y: sY, M: sM, D: sD, dailyLapses } = action.payload;
      return { ...state, statSelectedDate: new Date(sY, sM, sD), dailyLapses };
    case PLAN_SELECT_DAY:
      const { Y: pY, M: pM, D: pD } = action.payload;
      return { ...state, planSelectedDate: new Date(pY, pM, pD) };
    default:
      return state;
  }
};

export default calendarReducer;
