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

const PrivateRoute = ({
  children,
  exact,
  path,
}) => {
  const { user } = useAuth();
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) => ((user)
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
};

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
