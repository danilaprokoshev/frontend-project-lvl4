// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
  Link,
} from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const Home = () => <h2>Chat</h2>;

const Login = () => <h2>Login</h2>;

// const NotFound = () => (
//   <h1 className="h4 text-center text-muted">
//     Ой, похоже, такой страницы нет!
//   </h1>
// );

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Chat</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  </Router>
);

const mountNode = document.querySelector('#chat');
ReactDOM.render(<App />, mountNode);
