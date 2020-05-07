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
        <nav className="center">
          <div className="container">
            <div className="font-header">TMDB API</div>
            <div>
              <div className="horizontal-list">
                <div>
                  <Link to="/movies/popular">
                    <span>Popular </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
                <div>
                  <Link to="/movies/top_rated">
                    <span>Top Rated </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
                <div>
                  <Link to="/movies/upcoming">
                    <span>Upcoming </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
                <div>
                  <Link to="/movies/now_playing">
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
            <Route exact path="/">
              <MovieList apiSearch={{ apiURL: API_GET_MOVIE_POPULAR, searchBy: 'Popularity' }} />
            </Route>
            <Route exact path="/movies/popular">
              <MovieList apiSearch={{ apiURL: API_GET_MOVIE_POPULAR, searchBy: 'Popularity' }} />
            </Route>
            <Route exact path="/movies/top_rated">
              <MovieList apiSearch={{ apiURL: API_GET_MOVIE_TOP_RATED, searchBy: 'Top Rated' }} />
            </Route>
            <Route exact path="/movies/upcoming">
              <MovieList apiSearch={{ apiURL: API_GET_MOVIE_UPCOMING, searchBy: 'Upcoming' }} />
            </Route>
            <Route exact path="/movies/now_playing">
              <MovieList apiSearch={{ apiURL: API_GET_MOVIE_IN_THEATRES, searchBy: 'Now Playing' }} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
