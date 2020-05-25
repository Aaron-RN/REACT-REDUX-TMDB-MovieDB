import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import MovieList from './components/functional/movieList';
import MoviePage from './components/functional/moviePage';
import GenreList from './components/functional/genresList';
import './assets/css/reset_css.css';
import './assets/css/App.css';
import {
  API_GET_MOVIE_POPULAR, API_GET_MOVIE_TOP_RATED, API_GET_MOVIE_UPCOMING,
  API_GET_MOVIE_IN_THEATRES,
} from './redux/actions/index';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="center container">
            <div className="font-header">TMDB API</div>
            <div>
              <div className="horizontal-list">
                <div>
                  <Link to={{
                    pathname: '/movies/popular',
                    route_state: {
                      apiURL: API_GET_MOVIE_POPULAR,
                      searchBy: 'Popularity',
                      page: '1',
                      resetPage: true,
                    },
                  }}
                  >
                    <span>Popular </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
                <div>
                  <Link to={{
                    pathname: '/movies/top_rated',
                    route_state: {
                      apiURL: API_GET_MOVIE_TOP_RATED,
                      searchBy: 'Top Rated',
                      page: '1',
                      resetPage: true,
                    },
                  }}
                  >
                    <span>Top Rated </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
                <div>
                  <Link to={{
                    pathname: '/movies/upcoming',
                    route_state: {
                      apiURL: API_GET_MOVIE_UPCOMING,
                      searchBy: 'Upcoming',
                      page: '1',
                      resetPage: true,
                    },
                  }}
                  >
                    <span>Upcoming </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
                <div>
                  <Link to={{
                    pathname: '/movies/now_playing',
                    route_state: {
                      apiURL: API_GET_MOVIE_IN_THEATRES,
                      searchBy: 'Now Playing',
                      page: '1',
                      resetPage: true,
                    },
                  }}
                  >
                    <span>Recent </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
              </div>
              <div className="nav-link"><Link to="/genres">Show Genres</Link></div>
            </div>
            <div className="logo" />
          </div>
        </nav>
        <main className="App-body">
          <Switch>
            <Route exact path="/genres" component={GenreList} />
            <Route exact path="/movies/genres" component={MovieList} />
            <Route exact path="/movie/:id" component={MoviePage} />
            <Route exact path="/movies/:id/similar" component={MovieList} />
            <Route exact path="/" component={MovieList} />
            <Route exact path="/movies/popular" component={MovieList} />
            <Route exact path="/movies/top_rated" component={MovieList} />
            <Route exact path="/movies/upcoming" component={MovieList} />
            <Route exact path="/movies/now_playing" component={MovieList} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
