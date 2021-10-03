import {
  ADD_SUBEJCT,
  DEL_SUBEJCT,
  EDIT_SUBEJCT,
  GET_SUBJECT,
} from "_actions/types";

const initState = {
  subjects: [],
  newSubject: {},
};

const subjectReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_SUBJECT:
      return {
        ...state,
        subjects: action.payload.subjects,
      };
    case ADD_SUBEJCT:
      return {
        ...state,
        newSubject: action.payload.newSubject,
      };
    case EDIT_SUBEJCT:
      return { ...state, subjectData: action.payload };
    case DEL_SUBEJCT:
      return { ...state, subjectData: action.payload };
    default:
      return state;
  }
};

export default subjectReducer;
