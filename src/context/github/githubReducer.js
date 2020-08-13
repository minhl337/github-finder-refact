import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_INFO } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case GET_INFO:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        repos: action.payload.repos,
      };
    default:
      return state;
  }
};
