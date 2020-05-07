import { combineReducers } from 'redux';
import moviesReducer from './movies';
import filterReducer from './filter';
import loaderReducer from './loader';
import genresReducer from './genres';

const rootReducer = combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  filter: filterReducer,
  status: loaderReducer,
});

export default rootReducer;
