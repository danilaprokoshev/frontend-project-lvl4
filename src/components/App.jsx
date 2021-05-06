// @ts-check

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PrivatePage from './PrivatePage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import authContext from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  return (
    <authContext.Provider value={{ loggedIn, logIn }}>
      {children}
    </authContext.Provider>
  );
};

const isAuthenticated = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (userId && userId.token);
};

const PrivateRoute = ({ children, exact, path }) => (
  <Route
    exact={exact}
    path={path}
    render={({ location }) => ((isAuthenticated())
      ? (
        children
      )
      : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
  />
);

const App = () => {
  useEffect(() => {
    localStorage.removeItem('userId');
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar variant="dark" bg="dark" expand="lg">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Chat</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute exact path="/">
              <PrivatePage />
            </PrivateRoute>
            <Route path="*">
              <Redirect to="/404 " />
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>

  );
};
export default App;
