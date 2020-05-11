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

// Show MovieList Page with all movies related to the selected genre
test('shows elements of Popular page', async () => {
  const textTitle = 'Movies sorted by Popularity';
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
  fireEvent.click(screen.getByText(/popular/i));

  // wait for page to load
  const moviesSortedBy = await screen.findByText(regTitle);
  expect(moviesSortedBy).toHaveTextContent(regTitle);

  // show previous and next buttons
  expect(screen.getByText(/next/i)).toBeInTheDocument();
  expect(screen.getByText(/prev/i)).toBeInTheDocument();
});

test('shows elements of Top rated page', async () => {
  const textTitle = 'Movies sorted by Top Rated';
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
  fireEvent.click(screen.getByText(/top rated/i));

  // wait for page to load
  const moviesSortedBy = await screen.findByText(regTitle);
  expect(moviesSortedBy).toHaveTextContent(regTitle);

  // show previous and next buttons
  expect(screen.getByText(/next/i)).toBeInTheDocument();
  expect(screen.getByText(/prev/i)).toBeInTheDocument();
});

test('shows elements of Upcoming page', async () => {
  const textTitle = 'Movies sorted by Upcoming';
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
  fireEvent.click(screen.getByText(/upcoming/i));

  // wait for page to load
  const moviesSortedBy = await screen.findByText(regTitle);
  expect(moviesSortedBy).toHaveTextContent(regTitle);

  // show previous and next buttons
  expect(screen.getByText(/next/i)).toBeInTheDocument();
  expect(screen.getByText(/prev/i)).toBeInTheDocument();
});

test('shows elements of Recent page', async () => {
  const textTitle = 'Movies sorted by Now Playing';
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
  fireEvent.click(screen.getByText(/recent/i));

  // wait for page to load
  const moviesSortedBy = await screen.findByText(regTitle);
  expect(moviesSortedBy).toHaveTextContent(regTitle);

  // show previous and next buttons
  expect(screen.getByText(/next/i)).toBeInTheDocument();
  expect(screen.getByText(/prev/i)).toBeInTheDocument();
});
