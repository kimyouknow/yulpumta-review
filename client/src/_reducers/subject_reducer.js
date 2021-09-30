import {
  ADD_SUBEJCT,
  DEL_SUBEJCT,
  EDIT_SUBEJCT,
  GET_SUBJECT,
} from "_actions/types";

const initState = {
  subjects: [],
  error: "",
};

const subjectReducer = (state = initState, action) => {
  // type마다 다른 것을 switch로 처리
  switch (action.type) {
    case GET_SUBJECT:
      return {
        ...state,
        subjects: action.payload.subjects,
        error: action.payload.message,
      };
    case ADD_SUBEJCT:
      return { ...state, subjectData: action.payload };
    case EDIT_SUBEJCT:
      return { ...state, subjectData: action.payload };
    case DEL_SUBEJCT:
      return { ...state, subjectData: action.payload };
    default:
      return state;
  }
};

export default subjectReducer;
