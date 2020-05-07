import { FETCH_GENRES } from '../actions/index';

const genresReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_GENRES:
      return [...action.response];
    default:
      return state;
  }
};

export default genresReducer;
