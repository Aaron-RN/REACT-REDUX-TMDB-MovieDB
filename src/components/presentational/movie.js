import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/movie.css';

function scrollOnHover(element) {
  element.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

const Movie = ({ movie }) => {
  const poster_image = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
  const backdrop_image = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`;
  const selectMovie = React.useRef(null);

  return (
    <div ref={selectMovie} className="movie" onMouseEnter={ () => {scrollOnHover(selectMovie)}}>
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
