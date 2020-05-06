import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/movie.css';

const MoviePage = ({ match, location }) => {
  let render;
  if (location.route_state) {
    const { movies } = location.route_state;
    const movie_id_params = parseInt(match.params.id, 10);
    const movie = movies.results.filter( movie => movie.id === movie_id_params)[0];
    const poster_image = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    const backdrop_image = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    
    render = (
              <div className="movie-page" style={{backgroundImage: backdrop_image}}>
                <div className="poster-container">
                  <div className="bg" style={{backgroundImage: poster_image}}></div>
                </div>
                <div className="desc container">
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
  } else {
    render = (
      <div className="error-page">
        <h5>ERROR NO MOVIE FOUND</h5>
      </div>
    )
  }

  return render;
};

MoviePage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};


export default MoviePage;

