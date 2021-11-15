import { SUBJECT_ACTIVE, SUBJECT_ADD, SUBJECT_DEL, SUBJECT_EDIT, SUBJECT_GET, SUBJECT_RECORD } from '_actions/types';

const initState = {
  subjects: [],
  activeS: {},
};

const subjectReducer = (state = initState, action) => {
  switch (action.type) {
    case SUBJECT_GET:
      return {
        ...state,
        subjects: action.payload.subjects,
      };
    case SUBJECT_ADD:
      return {
        ...state,
        subjects: [...state.subjects, { ...action.payload, todayTotalT: 0 }],
      };
    case SUBJECT_EDIT:
      const target = action.payload;
      return {
        ...state,
        subjects: state.subjects.map((el) => (el._id === target._id ? (el = { ...el, title: target.title }) : el)),
      };
    case SUBJECT_DEL:
      return {
        ...state,
        subjects: state.subjects.filter((el) => el._id !== action.payload.subject_id),
      };
    case SUBJECT_ACTIVE:
      return {
        ...state,
        activeS: action.payload,
      };
    case SUBJECT_RECORD:
      return state;
    default:
      return state;
  }
};

export default subjectReducer;
