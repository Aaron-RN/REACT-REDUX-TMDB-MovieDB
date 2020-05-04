import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Movie from '../presentational/movie';
import '../../assets/css/movieList.css';

const MovieList = ({ movies, genres, filter, status }) => {
  // const filteredMovies = (filter !== 'All') ? movies.results.filter(book => movies.genre === filter) : movies;
  console.log(movies);

  const { isLoading } = status;
  const renderMain = isLoading
    ? (
      <div className="text-center">
        <div className="loader center" />
        <h1 className="text-white">Loading...</h1>
      </div>
    )
    : (
      <div className="movies-section">
        {movies.results.map(movie => (
          <Movie
            movie={movie}
            key={movie.id + movie.title}
          />
        ))}
      </div>
    );
  return (
    <div className="movie-list">
      {renderMain}
    </div>
  );
}

MovieList.defaultProps = {
  filter: 'All',
};

MovieList.propTypes = {
  movies: PropTypes.instanceOf(Object).isRequired,
  genres: PropTypes.instanceOf(Array).isRequired,
  filter: PropTypes.string,
  status: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  movies: state.movies,
  genres: state.genres,
  filter: state.filter,
  status: state.status,
});

// const mapDispatchToProps = dispatch => ({
//   changeFilter: category => {
//     dispatch(changeFilter(category));
//   },
//   toggleModal: (modalType, selectedObject) => {
//     dispatch(toggleModal(modalType, selectedObject));
//   },
// });

export default connect(mapStateToProps, null)(MovieList);
