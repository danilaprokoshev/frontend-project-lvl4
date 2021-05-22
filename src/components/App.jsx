// @ts-check

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PrivatePage from './PrivatePage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import useAuth from '../hooks/authorization.jsx';

const isAuthenticated = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (userId && userId.token);
};

const PrivateRoute = ({
  children,
  exact,
  path,
}) => (
  <Route
    exact={exact}
    path={path}
    render={({ location }) => (((isAuthenticated()))
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

// TODO: структурировать компненты (и другие модули) и их выбор через index.js (mapping)
// https://ru.hexlet.io/challenges/js_react_modals/instance
const App = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="mb-3 navbar navbar-expand-lg navbar-dark bg-dark">
          <Nav.Link className="mr-auto navbar-brand" as={Link} to="/">{t('title')}</Nav.Link>
          {auth.user && <Button variant="outline-light" onClick={auth.logOut}>{t('log_out')}</Button>}
        </Navbar>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <PrivateRoute exact path="/">
            <PrivatePage />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/404" />
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
