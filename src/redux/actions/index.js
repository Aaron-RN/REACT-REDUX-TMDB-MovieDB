import axios from 'axios';
require('dotenv').config();

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY;
const API_GET_GENRES = 'genre/movie/list';
const API_GET_MOVIE_POPULAR = 'movie/popular';
const API_GET_MOVIE_TOP_RATED = 'movie/top_rated';
const API_GET_MOVIE_UPCOMING = 'movie/upcoming';
const API_GET_MOVIE_IN_THEATRES = 'movie/now_playing';
const API_GET_MOVIE_BY = 'discover/movie';

const API_PARAMS_LANG_EN = '&language=en-US';
const API_PARAMS_PAGE = '&page=';
const API_PARAMS_GENRE = '&with_genres='

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';
const FETCH_MOVIELIST = 'FETCH_MOVIELIST';
const FETCH_GENRES = 'FETCH_GENRES';
const CHANGE_FILTER = 'CHANGE_FILTER';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const REFRESH_MODAL = 'REFRESH_MODAL';

const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

const fetchRequestSuccess = response => ({
  type: FETCH_REQUEST_SUCCESS,
  response,
});

const fetchRequestFailure = (response, form = '') => ({
  type: FETCH_REQUEST_FAILURE,
  response,
  form,
});

const fetchMovieListSuccess = (movies, apiURL, searchBy, genreIDS) => ({
  type: FETCH_MOVIELIST,
  response: movies,
  apiURL,
  searchBy,
  genreIDS,
});

const fetchGenresSuccess = genres => ({
  type: FETCH_GENRES,
  response: genres,
});

const changeFilter = genre => ({
  type: CHANGE_FILTER,
  genre,
});

const toggleModal = (modalType, selectedObject) => ({
  type: TOGGLE_MODAL,
  modalType,
  selectedObject,
});

const refreshModal = selectedObject => ({
  type: REFRESH_MODAL,
  selectedObject,
});

// Asyncronous Requests to Backend API

// MovieList Populate List
const fetchMovieListBy = (API_GET_MOVIE_BY = API_GET_MOVIE_POPULAR, searchBy = 'Popularity', page = '1', genre_ids = []) => dispatch => {
  console.log(genre_ids);
  const genreParams = genre_ids ? `${API_PARAMS_GENRE}${genre_ids.join('%2C')}` : '';
  console.log(genreParams)
  dispatch(fetchRequest());
  axios.get(`${URL}${API_GET_MOVIE_BY}${API_KEY}${API_PARAMS_LANG_EN}${API_PARAMS_PAGE}${page}${genreParams}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.statusText));
      dispatch(fetchMovieListSuccess(response.data, API_GET_MOVIE_BY, searchBy, genre_ids));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.status_message));
    });
};

// Genres Populate List
const fetchGenres = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}${API_GET_GENRES}${API_KEY}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.statusText));
      dispatch(fetchGenresSuccess(response.data.genres));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.status_message));
    });
};

export {
  CHANGE_FILTER, FETCH_MOVIELIST, FETCH_GENRES,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE,
  TOGGLE_MODAL, REFRESH_MODAL,
  API_GET_MOVIE_POPULAR, API_GET_MOVIE_TOP_RATED, API_GET_MOVIE_UPCOMING,
  API_GET_MOVIE_IN_THEATRES, API_GET_MOVIE_BY,
  changeFilter, fetchMovieListBy, fetchGenres, 
  toggleModal, refreshModal,
};