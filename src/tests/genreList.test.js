import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from '../App';

import rootReducer from '../redux/reducers/index';
import { fetchGenres } from '../redux/actions';

const initialState = {
  movies: {
    page: 1, total_results: 100, total_pages: 500, searchBy: 'Popularity', results: [],
  },
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
  ],
  filter: 'All',
  status: { isLoading: false, errors: [] },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
store.dispatch(fetchGenres());

test('shows elements of Show Genres page', () => {
  const textTitle = 'Select all genres you want to search for...';
  const regTitle = new RegExp(textTitle, 'i');
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  // query* functions will return the element or null if it cannot be found
  // get* functions will return the element or throw an error if it cannot be found
  expect(screen.queryByText(textTitle)).toBeNull();

  // the queries can accept a regex to make your selectors more resilient to content changes.
  fireEvent.click(screen.getByText(/show genres/i));

  expect(screen.getByText(regTitle)).toBeInTheDocument(regTitle);

  // show previous and next buttons
  expect(screen.getByText(/action/i)).toBeInTheDocument();
  expect(screen.getByText(/adventure/i)).toBeInTheDocument();
  expect(screen.getByText(/animation/i)).toBeInTheDocument();
});

test('Show Genres page, genres when clicked are added to filter', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const genreFilter = document.querySelector('.selected-genres');
  expect(genreFilter).toBeInTheDocument();

  // Clicking the different genre buttons adds the selected genres to the filter
  fireEvent.click(screen.getByText(/action/i));
  expect(genreFilter).toHaveTextContent(/action/i);

  fireEvent.click(screen.getByText(/animation/i));
  expect(genreFilter).toHaveTextContent(/action | animation/i);
});
