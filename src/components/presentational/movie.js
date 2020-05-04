import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/movie.css';

const Movie = ({ movie }) => {
  const poster_image = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
  const backdrop_image = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`;
  return (
    <div className="movie">
      <div className="poster-container">
        <div className="bg" style={{backgroundImage: poster_image}}></div>
      </div>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    genre_ids: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default Movie;
