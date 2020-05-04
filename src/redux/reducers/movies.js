import { FETCH_MOVIELIST } from '../actions/index';

const moviesReducer = (state = { page: 1, total_results: 100, total_pages: 500, results: [] }, action) => {
  switch (action.type) {
    case FETCH_MOVIELIST:
      return {
        page: action.response.page,
        total_results: action.response.total_results,
        total_pages: action.response.total_pages,
        results: [...action.response.results],
      }
    default:
      return state;
  }
};

export default moviesReducer;
