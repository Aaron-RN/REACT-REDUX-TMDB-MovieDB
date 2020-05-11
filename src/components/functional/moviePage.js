import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse, stringify } from 'flatted';
import '../../assets/css/movie.css';
import noPoster from '../../assets/images/no_poster_image.jpg';


const MoviePage = ({ match, genres, movies }) => {
  let nMovies = movies;
  let nGenres = genres;

  if (typeof (Storage) !== 'undefined') {
    if (nMovies.results.length === 0) {
      nMovies = parse(localStorage.getItem('movies'));
      nGenres = JSON.parse(localStorage.getItem('genres'));
    }
  }

  let render;
  if (nMovies.results.length > 0) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('movies', stringify(nMovies));
      localStorage.setItem('genres', JSON.stringify(nGenres));
    }
    const movieIDParams = parseInt(match.params.id, 10);
    const movie = nMovies.results.filter(movie => movie.id === movieIDParams)[0];
    const posterImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    const imageToUse = movie.poster_path === null ? `url(${noPoster})` : posterImage;
    const showTitle = movie.poster_path === null ? movie.title : '';
    const backdropImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    const movieGenres = nGenres.filter(g => movie.genre_ids.includes(g.id)).map(g => g.name);

    const commaSeparatedNumericValues = num => {
      const numToString = num.toString();
      let newString = '';
      let count = 0;
      for (let i = numToString.length - 1; i >= 0; i -= 1) {
        newString = `${numToString[i]}${newString}`;
        count += 1;
        if (count === 3 && i !== 0) {
          newString = `,${newString}`;
          count = 0;
        }
      }
      return newString.trim();
    };

    const roundTo = (x, precision) => {
      const y = +x + (precision === undefined ? 0.5 : precision / 2);
      return y - (y % (precision === undefined ? 1 : +precision));
    };

    const generateStars = rating => {
      const roundedRating = roundTo(rating, 0.5);
      const noStar = key => (
        <div key={`${key}nostart`} className="star"><i className="far fa-star" /></div>
      );
      const star = key => (
        <div key={`${key}star`} className="star"><i className="fas fa-star" /></div>
      );
      const halfStar = key => (
        <div key={`${key}halfstar`} className="star"><i className="fas fa-star-half-alt" /></div>
      );
      const starRating = rating => {
        const ratingElement = [];
        for (let i = 1; i <= 10; i += 1) {
          const halfRating = (rating - i === 0.5);
          if (i > rating) {
            ratingElement.push(noStar(i));
          } else if (halfRating) {
            ratingElement.push(halfStar(i));
          } else { ratingElement.push(star(i)); }
        }
        return ratingElement;
      };
      return starRating(roundedRating);
    };

    render = (
      <div className="movie-page" style={{ backgroundImage: backdropImage }}>
        <div className="desc center">
          <div className="desc-info">
            <div className="title font-header">{movie.title}</div>
            <div className="category font-header">{movieGenres.join(' | ')}</div>
            <div className="date">
              <span>
                Release Date: &nbsp;
                {movie.release_date}
              </span>
            </div>
          </div>
          <div className="flex-row">
            <div className="poster-container">
              <div className="bg" title={showTitle} style={{ backgroundImage: imageToUse }} />
            </div>
            <div className="movie-data">
              <div className="font-header">
                Rating:
                <span className="vote-average">
                  {movie.vote_average}
                  /10
                </span>
              </div>
              <div>
                {generateStars(movie.vote_average)}
              </div>
              <div className="review-count mb-1">
                <div>
                  {commaSeparatedNumericValues(movie.vote_count)}
                  &nbsp;reviews
                </div>
              </div>
              <div className="font-header">Summary: </div>
              {movie.overview}
            </div>
          </div>
          <button type="button">
            <Link to={{
              pathname: `/movies/${movie.id}/similar`,
              route_state: {
                movieID: movie.id,
                searchBy: 'Similarity',
              },
            }}
            >
              Find Similar Movies...
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
    );
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
