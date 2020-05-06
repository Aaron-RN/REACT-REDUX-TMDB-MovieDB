import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieList from './components/functional/movieList';
import MoviePage from './components/functional/moviePage';
import GenreList from './components/functional/genresList';
import './assets/css/reset_css.css';
import './assets/css/App.css';
import { API_GET_MOVIE_POPULAR, API_GET_MOVIE_TOP_RATED, API_GET_MOVIE_UPCOMING,
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
                <div><Link to="/movies/popular">Popular <i className="fas fa-film"></i></Link></div>
                <div><Link to="/movies/top_rated">Top Rated <i className="fas fa-film"></i></Link></div>
                <div><Link to="/movies/upcoming">Upcoming <i className="fas fa-film"></i></Link></div>
                <div><Link to="/movies/now_playing">Recent <i className="fas fa-film"></i></Link></div>
              </div>
              <div className=""><Link to="/genres">Show Genres</Link></div>
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
              <MovieList apiSearch={{apiURL: API_GET_MOVIE_POPULAR, searchBy: 'Popularity'}} />
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
