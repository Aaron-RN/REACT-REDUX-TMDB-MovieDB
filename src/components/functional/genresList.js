import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import '../../assets/css/genreList.css';
import { API_GET_MOVIE_BY } from '../../redux/actions/index';

const GenreList = ({ genres, status, fetchMovieListBy }) => {
  const [selectedGenres, selectGenres] = useState([]);
  const toggleGenre = (genre) => {
    const filteredGenres = selectedGenres.filter( g => g.id !== genre.id);
    if (filteredGenres.length === selectedGenres.length) {
      selectGenres([
        ...filteredGenres,
        genre
      ]);
    }
    else {
      selectGenres([
        ...filteredGenres,
      ]);
    }
  };

  const renderMain =
    (
      <div className="genre-list container">
        <div>Select all genres you want to search for...</div>
        <div className="selected-genres">{selectedGenres.map( g => g.name).join(', ')}</div>
        <div className="horizontal-list">
          {genres.map( genre => (
            <button
              type="button"
              key={genre.id + genre.name}
              className="genre"
              onClick={() => toggleGenre(genre)}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <button type="button">
          <Link to={{
            pathname: '/movies/genres',
            route_state: {
              apiURL: API_GET_MOVIE_BY,
              searchBy: selectedGenres.map(g => g.name).join(', '),
              genreIDs: selectedGenres.map(g => g.id),
            }
          }}>Search By Genre
          </Link>
        </button>
      </div>
    );

  return renderMain;
}

GenreList.propTypes = {
  genres: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  genres: state.genres,
});


export default connect(mapStateToProps, null)(GenreList);
