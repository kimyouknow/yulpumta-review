import { GET_TOTAL_TIME } from "_actions/types";

const initState = {
  timeInfo: {},
  lapseInfo: {},
};

const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TOTAL_TIME:
      const { lapseData, statData } = action.payload;
      return { timeInfo: statData, lapseInfo: lapseData };
    default:
      return state;
  }
};

export default calendarReducer;
