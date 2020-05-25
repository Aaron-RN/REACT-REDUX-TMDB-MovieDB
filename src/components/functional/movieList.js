import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Movie from '../presentational/movie';
import GenreFilter from '../presentational/genreFilter';
import '../../assets/css/movieList.css';
import { fetchMovieListBy, fetchSimilarMovies, changeFilter } from '../../redux/actions/index';

const MovieList = (
  {
    match, location, apiSearch, movies, genres, filter,
    status, fetchMovieListBy, fetchSimilarMovies, changeFilter,
  },
) => {
  const [selectedMovie, selectMovie] = useState({});
  const [moviePage, gotoMoviePage] = useState(false);

  const apiSearchQuery = apiSearch || (location.route_state ? location.route_state : movies);
  if (typeof (Storage) !== 'undefined') {
    if (apiSearchQuery.resetPage) { localStorage.setItem('currentPage', JSON.stringify('1')); }
    if (apiSearchQuery.page !== '1') {
      apiSearchQuery.page = JSON.parse(localStorage.getItem('currentPage'));
    }
  }

  useEffect(() => {
    if (selectedMovie.element) {
      selectedMovie.element.classList.toggle('selected');
      selectedMovie.textElement.classList.toggle('hide');
    }
  }, [selectedMovie]);
  useEffect(() => {
    if (match.url.search(/similar/) !== -1) {
      fetchSimilarMovies(match.params.id, 'Similarity', apiSearchQuery.page);
    } else {
      fetchMovieListBy(
        apiSearchQuery.apiURL,
        apiSearchQuery.searchBy,
        apiSearchQuery.page,
        apiSearchQuery.genreIDs,
      );
    }
  }, [
    apiSearchQuery.apiURL, apiSearchQuery.genreIDs, apiSearchQuery.movieID,
    apiSearchQuery.searchBy, apiSearchQuery.page, fetchMovieListBy, fetchSimilarMovies,
  ]);

  const filteredMovies = (filter !== 'All')
    ? movies.results.filter(movie => movie.genre_ids.includes(parseInt(filter, 10)))
    : movies.results;
  const { isLoading } = status;
  const {
    // eslint-disable-next-line camelcase
    page, total_pages, apiURL, searchBy, genreIDs,
  } = movies;
  const moviesContainer = React.useRef(null);
  const prevPage = (page - 1) <= 0 ? 1 : (page - 1);
  // eslint-disable-next-line camelcase
  const nextPage = (page + 1) > total_pages ? total_pages : (parseInt(page, 10) + parseInt(1, 10));

  const changePage = page => {
    apiSearchQuery.resetPage = false;
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('currentPage', JSON.stringify(page));
    }
    fetchMovieListBy(apiURL, searchBy, page, genreIDs);
  };

  const scrollHorizontal = event => {
    const isFirefox = window.navigator.userAgent.search('Firefox');

    if (isFirefox > 0) {
      moviesContainer.current.scrollLeft += event.deltaY * 32;
    } else {
      moviesContainer.current.scrollLeft += event.deltaY;
    }
  };
  const scrollOnHover = element => {
    element.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  const movieDetails = (element, textElement, movie) => {
    scrollOnHover(element);
    if (selectedMovie.element && selectedMovie.textElement) {
      selectedMovie.element.classList.remove('selected');
      selectedMovie.textElement.classList.add('hide');
    }
    if (movie.title !== selectedMovie.title) {
      const objectProps = {
        element: element.current,
        textElement: textElement.current,
      };
      const newMovie = Object.assign(movie, objectProps);
      selectMovie(newMovie);
    } else {
      gotoMoviePage(true);
    }
  };

  /* eslint-disable camelcase */
  const renderMain = isLoading
    ? (
      <div className="text-center">
        <div className="loader center" />
        <h1 className="text-white">Loading...</h1>
      </div>
    )
    : (
      <div>
        <div className="text-center">
          <span>
            Movies sorted by&nbsp;
            {searchBy}
          </span>
        </div>
        <div className="pagination">
          <button
            type="button"
            title="Previous 20 movies"
            onClick={() => changePage(prevPage)}
          >
            Prev
          </button>
          <div>
            {page}
            <span> / </span>
            {total_pages}
          </div>
          <button
            type="button"
            title="Next 20 movies"
            onClick={() => changePage(nextPage)}
          >
            Next
          </button>
        </div>
        <GenreFilter filterSelected={filter} genres={genres} changeFilter={changeFilter} />
        <div ref={moviesContainer} className="movies-section" onWheel={scrollHorizontal}>
          {filteredMovies.map(movie => (
            <Movie
              movie={movie}
              key={movie.id + movie.title}
              movieDetails={movieDetails}
            />
          ))}
        </div>
      </div>
    );
  /* eslint-enable camelcase */

  return !moviePage ? renderMain
    : (
      <Redirect
        push
        to={{
          pathname: `/movie/${selectedMovie.id}`,
        }}
      />
    );
};

MovieList.defaultProps = {
  filter: 'All',
  apiSearch: null,
  location: null,
};

MovieList.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object),
  movies: PropTypes.instanceOf(Object).isRequired,
  genres: PropTypes.instanceOf(Array).isRequired,
  filter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  status: PropTypes.instanceOf(Object).isRequired,
  apiSearch: PropTypes.instanceOf(Object),
  fetchMovieListBy: PropTypes.func.isRequired,
  fetchSimilarMovies: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  movies: state.movies,
  genres: state.genres,
  filter: state.filter,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  fetchMovieListBy: (API_GET_MOVIE_BY, searchBy, page, genreIDs) => {
    dispatch(fetchMovieListBy(API_GET_MOVIE_BY, searchBy, page, genreIDs));
  },
  fetchSimilarMovies: (movieID, searchBy, page) => {
    dispatch(fetchSimilarMovies(movieID, searchBy, page));
  },
  changeFilter: genre => {
    dispatch(changeFilter(genre));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
