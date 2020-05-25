import { combineReducers } from 'redux';
import moviesReducer from './movies';
import selectedMovieReducer from './selectedMovie';
import filterReducer from './filter';
import loaderReducer from './loader';
import genresReducer from './genres';

const rootReducer = combineReducers({
  movies: moviesReducer,
  selectedMovie: selectedMovieReducer,
  genres: genresReducer,
  filter: filterReducer,
  status: loaderReducer,
});

export default rootReducer;
