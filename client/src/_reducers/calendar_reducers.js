import {
  GET_TOTAL_TIME,
  PLAN_ADD,
  PLAN_CHECK,
  PLAN_DELETE,
  PLAN_EDIT,
  PLAN_GET,
  PLAN_SELECT_DAY,
  STAT_SELECT_DAY,
} from '_actions/types';

const initState = {
  dailyTotalTimes: [],
  dailyLapses: [],
  statSelectedDate: new Date(),
  planSelectedDate: new Date(),
  monthPlans: Array(31).fill([]),
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
    case PLAN_GET:
      return { ...state, monthPlans: action.payload };
    case PLAN_ADD:
      const { addedDate, newPlan } = action.payload;
      let addClonePlans = state.monthPlans;
      const addedPlans = [...addClonePlans[addedDate - 1], newPlan];
      addClonePlans.splice(addedDate - 1, 1, addedPlans);
      return { ...state, monthPlans: addClonePlans };
    case PLAN_EDIT:
      const { plan_id: editId, targetDate: editDate, title, desc } = action.payload;
      let editClonePlans = state.monthPlans;
      const editTarget = editClonePlans[editDate - 1].map((plan) => {
        if (plan._id === editId) return { ...plan, p_title: title, p_desc: desc };
        return plan;
      });
      editClonePlans.splice(editDate - 1, 1, editTarget);
      return { ...state, monthPlans: editClonePlans };
    case PLAN_CHECK:
      const { plan_id: checkId, targetDate: checkDate, isDone } = action.payload;
      let checkClonePlans = state.monthPlans;
      const checkTarget = checkClonePlans[checkDate - 1].map((plan) => {
        if (plan._id === checkId) return { ...plan, p_isDone: !isDone };
        return plan;
      });
      checkClonePlans.splice(checkDate - 1, 1, checkTarget);
      return { ...state, monthPlans: checkClonePlans };
    case PLAN_DELETE:
      const { plan_id: delId, targetDate: delDate } = action.payload;
      let delClonePlans = state.monthPlans;
      const delTarget = delClonePlans[delDate - 1].filter((plan) => plan._id !== delId);
      delClonePlans.splice(delDate - 1, 1, delTarget);
      return { ...state, monthPlans: delClonePlans };
    default:
      return state;
  }
};

export default calendarReducer;
