import { FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE } from '../actions/index';

const loaderReducer = (state = { isLoading: false, form: '', errors: '' }, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        isLoading: true,
        errors: [],
      };
    case FETCH_REQUEST_SUCCESS:
      return {
        isLoading: false,
        errors: [],
      };
    case FETCH_REQUEST_FAILURE:
      return {
        isLoading: false,
        errors: action.response,
        form: action.form,
      };
    default:
      return state;
  }
};

export default loaderReducer;
