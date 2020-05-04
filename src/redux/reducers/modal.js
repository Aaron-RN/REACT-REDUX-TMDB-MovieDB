import { TOGGLE_MODAL, REFRESH_MODAL } from '../actions/index';

const modalReducer = (state = { showModal: false, type: 'comments', selectedObject: null }, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        showModal: !state.showModal,
        type: action.modalType,
        selectedObject: action.selectedObject,
      };
    case REFRESH_MODAL:
      return { ...state, selectedObject: action.selectedObject };
    default:
      return state;
  }
};

export default modalReducer;
