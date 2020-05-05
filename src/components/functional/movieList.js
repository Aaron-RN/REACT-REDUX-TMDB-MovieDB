import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Movie from '../presentational/movie';
import '../../assets/css/movieList.css';
import { fetchMovieListBy } from '../../redux/actions/index';

const MovieList = ({ apiSearch, movies, genres, filter, status, fetchMovieListBy }) => {
  useEffect(() => {
    fetchMovieListBy(apiSearch.apiURL, apiSearch.searchBy );
  }, [apiSearch.apiURL, apiSearch.searchBy, fetchMovieListBy]);

  // const filteredMovies = (filter !== 'All') ? movies.results.filter(book => movies.genre === filter) : movies;
  const { isLoading } = status;
  const { page, total_pages, api_URL, search_by } = movies;
  const moviesContainer = React.useRef(null);
  const prevPage = (page - 1) <= 0 ? 1 : (page - 1);
  const nextPage = (page + 1) > total_pages? total_pages : (page + 1);

  const scrollOnHover = (element) => {
    element.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }
  
  const renderMain = isLoading
    ? (
      <div className="text-center">
        <div className="loader center" />
        <h1 className="text-white">Loading...</h1>
      </div>
    )
    : (
      <div>
        <div className="text-center font-header">Movies sorted by {search_by}</div>
        <div className="pagination">
          <button type="button"
            title="Previous 20 movies"
            onClick={() => fetchMovieListBy(api_URL, search_by, prevPage)}>
              Prev
          </button>
          <div>{ page }</div>
          <button type="button"
            title="Next 20 movies"
            onClick={() => fetchMovieListBy(api_URL, search_by, nextPage)}>
              Next
          </button>
        </div>
        <div ref={moviesContainer} className="movies-section">
          {movies.results.map(movie => (
            <Movie
              movie={movie}
              key={movie.id + movie.title}
              scrollOnHover={scrollOnHover}
            />
          ))}
        </div>
      </div>
    );

  return renderMain;
}

MovieList.defaultProps = {
  filter: 'All',
};

MovieList.propTypes = {
  movies: PropTypes.instanceOf(Object).isRequired,
  genres: PropTypes.instanceOf(Array).isRequired,
  filter: PropTypes.string,
  status: PropTypes.instanceOf(Object).isRequired,
  apiSearch: PropTypes.instanceOf(Object).isRequired,
  fetchMovieListBy: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  movies: state.movies,
  genres: state.genres,
  filter: state.filter,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  fetchMovieListBy: (API_GET_MOVIE_BY, searchBy, page) => {
    dispatch(fetchMovieListBy(API_GET_MOVIE_BY, searchBy, page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
