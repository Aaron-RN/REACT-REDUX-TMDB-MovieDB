import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import '../../assets/css/movie.css';
import noPoster from '../../assets/images/no_poster_image.jpg';

const MoviePage = ({ match, genres, movies }) => {
  if (typeof (Storage) !== 'undefined') {
    if (movies.results.length === 0) {
      movies = JSON.parse(localStorage.getItem('movies'));
      genres = JSON.parse(localStorage.getItem('genres'));
    }
  }

  let render;
  if (movies.results.length > 0) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('movies', JSON.stringify(movies));
      localStorage.setItem('genres', JSON.stringify(genres));
    }
    const movie_id_params = parseInt(match.params.id, 10);
    const movie = movies.results.filter( movie => movie.id === movie_id_params)[0];
    const posterImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    const imageToUse = movie.poster_path === null ? `url(${noPoster})` : posterImage;
    const showTitle = movie.poster_path === null ? movie.title : '';
    const backdropImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    const movieGenres = genres.filter(g => movie.genre_ids.includes(g.id)).map(g => g.name);

    render = (
              <div className="movie-page" style={{backgroundImage: backdropImage}}>
                <div className="desc center">
                  <div className="desc-info">
                    <div className="title font-header">{movie.title}</div>
                    <div className="category font-header">{movieGenres.join(' | ')}</div>
                    <div className="author">
                      Release Date:
                      {movie.release_date}
                    </div>
                  </div>
                  <div className="poster-container">
                    <div className="bg" title={showTitle} style={{backgroundImage: imageToUse}}></div>
                  </div>
                  <button type="button">
                    <Link to={{
                      pathname: `/movies/${movie.id}/similar`,
                      route_state: {
                        movieID: movie.id,
                        searchBy: 'Similarity',
                      }
                    }}>
                      Similar Movies
                    </Link>
                  </button>
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
  movies: PropTypes.instanceOf(Object).isRequired,
  genres: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  movies: state.movies,
  genres: state.genres,
});

export default connect(mapStateToProps, null)(MoviePage);

