import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './assets/css/index.css';
import App from './App';

import rootReducer from './redux/reducers/movies';
// import { fetchMovieList, fetchGenres } from './actions';

const initialState = {
  movies: [],
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 27, name: 'Horor' },
    { id: 36, name: 'History' },
  ],
  status: { isLoading: false, errors: [] },
  modal: { showModal: false, type: 'notes', selectedObject: {} },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
// store.dispatch(fetchMovieList());
// store.dispatch(fetchGenres());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
