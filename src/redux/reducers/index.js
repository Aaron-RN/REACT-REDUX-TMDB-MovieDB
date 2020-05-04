import { combineReducers } from 'redux';
import moviesReducer from './movies';
import filterReducer from './filter';
import loaderReducer from './loader';
import genresReducer from './genres';
import modalReducer from './modal';

const rootReducer = combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  filter: filterReducer,
  status: loaderReducer,
  modal: modalReducer,
});

export default rootReducer;
