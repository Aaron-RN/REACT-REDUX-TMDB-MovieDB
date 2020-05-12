import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Tests related to all available react-router-dom links
test('renders popular movies link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/popular/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders top rated movies link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/top rated/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders upcoming movies link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/upcoming/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders recent movies link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/recent/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders show genres link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/show genres/i);
  expect(linkElement).toBeInTheDocument();
});
