import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case REMOVE_ALERT:
      return null;
    case SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
      };
    default:
      return state;
  }
};
