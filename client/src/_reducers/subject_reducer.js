import {
  ADD_SUBEJCT,
  DEL_SUBEJCT,
  EDIT_SUBEJCT,
  GET_SUBJECT,
  RECORD_SUBJECT,
} from "_actions/types";

const initState = {
  subjects: [],
  activeS: {},
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
        subjects: [...state.subjects, action.payload],
      };
    case EDIT_SUBEJCT:
      const target = action.payload;
      return {
        ...state,
        subjects: state.subjects.map((el) =>
          el._id === target._id ? (el = target) : el
        ),
      };
    case DEL_SUBEJCT:
      return {
        ...state,
        subjects: state.subjects.filter(
          (el) => el._id !== action.payload.subject_id
        ),
      };
    case RECORD_SUBJECT:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

export default subjectReducer;
