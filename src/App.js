import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieList from './components/functional/movieList';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/genres">Genres</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
        <main className="App">
          <div className="App-header">
            <Switch>
              <Route path="/movies">
              </Route>
              <Route path="/genres">
              </Route>
              <Route path="/">
                <MovieList />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
