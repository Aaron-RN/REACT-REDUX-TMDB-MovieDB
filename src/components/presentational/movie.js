import React from 'react';
import PropTypes from 'prop-types';
import noPoster from '../../assets/images/no_poster_image.jpg';
import '../../assets/css/movie.css';


const Movie = ({ movie, scrollOnHover }) => {
  const poster_image = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
  // const backdrop_image = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`;
  const imageToUse = movie.poster_path === null ? `url(${noPoster})` : poster_image;
  const showTitle = movie.poster_path === null ? movie.title : '';
  const selectMovie = React.useRef(null);

  return (
    <div ref={selectMovie} className="movie" onClick={ () => {scrollOnHover(selectMovie)}}>
      <div className="poster-container">
        <div className="bg" title={showTitle} style={{backgroundImage: imageToUse}}></div>
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
