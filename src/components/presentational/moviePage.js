import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/movie.css';

const MoviePage = ({ movie }) => {
  const poster_image = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
  const backdrop_image = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`;
  return (
    <div className="movie" style={{backgroundImage: backdrop_image}}>
      <div className="poster-container">
        <div className="bg" style={{backgroundImage: poster_image}}></div>
      </div>
      <div className="desc">
        <span className="category font-header">{movie.genre}</span>
        <span className="title font-header">{movie.title}</span>
        <span className="author">{movie.author}</span>
        <div className="actions">
          <button type="button" disabled>Comments</button>
          <button type="button" disabled>
            Remove Book
          </button>
          <button type="button" disabled>Edit</button>
        </div>
      </div>
    </div>
  );
};

MoviePage.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    genre_ids: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default MoviePage;
