import { FETCH_MOVIELIST } from '../actions/index';

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIELIST:
      return [...action.response];
    default:
      return state;
  }
};

export default moviesReducer;
