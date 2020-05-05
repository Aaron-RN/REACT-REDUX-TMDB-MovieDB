import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieList from './components/functional/movieList';
import './assets/css/reset_css.css';
import './assets/css/App.css';
import { API_GET_MOVIE_POPULAR, API_GET_MOVIE_TOP_RATED, API_GET_MOVIE_UPCOMING,
  API_GET_MOVIE_IN_THEATRES,
} from './redux/actions/index';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="container">
          <ul>
            <ul className="horizontal-list">
              <li><Link to="/movies/popular">Popular <i className="fas fa-film"></i></Link></li>
              <li><Link to="/movies/top_rated">Top Rated <i className="fas fa-film"></i></Link></li>
              <li><Link to="/movies/upcoming">Upcoming <i className="fas fa-film"></i></Link></li>
              <li><Link to="/movies/now_playing">Recent<i className="fas fa-film"></i></Link></li>
            </ul>
            <li>
              <Link to="/genres">Genres</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
          <div className="logo" />
        </nav>
        <main className="App-body">
          <Switch>
            <Route exact path="/movies">
            </Route>
            <Route exact path="/genres">
            </Route>
            <Route exact path="/movies/popular">
              <MovieList apiSearch={{apiURL: API_GET_MOVIE_POPULAR, searchBy: 'Popularity'}} />
            </Route>
            <Route exact path="/movies/top_rated">
              <MovieList apiSearch={{apiURL: API_GET_MOVIE_TOP_RATED, searchBy: 'Top Rated'}} />
            </Route>
            <Route exact path="/movies/upcoming">
              <MovieList apiSearch={{apiURL: API_GET_MOVIE_UPCOMING, searchBy: 'Upcoming'}} />
            </Route>
            <Route exact path="/movies/now_playing">
              <MovieList apiSearch={{apiURL: API_GET_MOVIE_IN_THEATRES, searchBy: 'Now Playing'}} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
