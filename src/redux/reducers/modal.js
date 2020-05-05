import { TOGGLE_MODAL, REFRESH_MODAL } from '../actions/index';

const modalReducer = (state = { showModal: false }, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        showModal: !state.showModal
      };
    case REFRESH_MODAL:
      return state;
    default:
      return state;
  }
};

export default modalReducer;
