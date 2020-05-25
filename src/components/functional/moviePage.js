import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { commaSeparatedNumericValues, roundTo } from '../misc/numberFunctions';
import { fetchMovie } from '../../redux/actions/index';
import '../../assets/css/movie.css';
import noPoster from '../../assets/images/no_poster_image.jpg';


const MoviePage = ({
  match, selectedMovie, fetchMovie,
}) => {
  const movieID = match.params.id;

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id, fetchMovie]);


  let render;
  if (selectedMovie.title) {
    /* eslint-disable camelcase */
    const {
      poster_path, title, backdrop_path, genres,
    } = selectedMovie;
    const posterImage = `url(https://image.tmdb.org/t/p/w500${poster_path})`;
    const imageToUse = poster_path === null ? `url(${noPoster})` : posterImage;
    const showTitle = poster_path === null ? title : '';
    const backdropImage = `url(https://image.tmdb.org/t/p/original${backdrop_path})`;
    const movieGenres = genres.map(g => g.name);
    /* eslint-enable no-unused-vars */

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
            <div className="title font-header">{selectedMovie.title}</div>
            <div className="category font-header">{movieGenres.join(' | ')}</div>
            <div className="date">
              <span>
                Release Date: &nbsp;
                {selectedMovie.release_date}
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
                  {selectedMovie.vote_average}
                  /10
                </span>
              </div>
              <div>
                {generateStars(selectedMovie.vote_average)}
              </div>
              <div className="review-count mb-1">
                <div>
                  {commaSeparatedNumericValues(selectedMovie.vote_count)}
                    &nbsp;reviews
                </div>
              </div>
              <div className="font-header">Summary: </div>
              {selectedMovie.overview}
            </div>
          </div>
          <button type="button">
            <Link to={{
              pathname: `/movies/${movieID}/similar`,
              route_state: {
                movieID,
                searchBy: 'Similarity',
                page: '1',
                resetPage: true,
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
        <h5>Sorry, Couldn&apos;t find that Movie</h5>
      </div>
    );
  }

  return render;
};

MoviePage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  selectedMovie: PropTypes.instanceOf(Object).isRequired,
  fetchMovie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie,
});

const mapDispatchToProps = dispatch => ({
  fetchMovie: movieID => {
    dispatch(fetchMovie(movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
