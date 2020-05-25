import { FETCH_MOVIE } from '../actions/index';

const selectedMovieReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return action.response;
    default:
      return state;
  }
};

export default selectedMovieReducer;
