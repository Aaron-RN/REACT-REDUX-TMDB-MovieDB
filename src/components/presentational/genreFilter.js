import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/genreFilter.css';

const GenreFilter = ({
  changeFilter, genres, filterSelected,
}) => {
  const selectGenre = React.useRef(null);
  const allGenres = [
    { id: 'All', name: 'All' }, ...genres,
  ];

  useEffect(() => {
    selectGenre.current.value = filterSelected;
  }, [filterSelected]);

  return (
    <div className="genre-filter">
      <select
        ref={selectGenre}
        name="category"
        onChange={() => changeFilter(selectGenre.current.value)}
      >
        {allGenres.map(genre => (
          <option key={genre.id + genre.name} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
};

GenreFilter.propTypes = {
  genres: PropTypes.instanceOf(Array).isRequired,
  filter:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  changeFilter: PropTypes.func.isRequired,
};

export default GenreFilter;
