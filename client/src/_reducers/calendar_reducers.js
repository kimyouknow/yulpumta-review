import { GET_TOTAL_TIME, SELECT_DAY } from "_actions/types";

const initState = {
  dailyTotalTimes: [],
  selectedDay: new Date(),
  dailyLapses: [],
};

const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TOTAL_TIME:
      return { ...state, dailyTotalTimes: action.payload };
    case SELECT_DAY:
      const { Y, M, D, dailyLapses } = action.payload;
      return { ...state, selectedDay: new Date(Y, M, D), dailyLapses };
    default:
      return state;
  }
};

export default calendarReducer;
