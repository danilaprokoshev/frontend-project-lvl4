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
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import PrivatePage from './PrivatePage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import useAuth from '../hooks/authorization.jsx';
import socketContext from '../contexts/socket.jsx';

import { addMessage, deleteMessages } from '../features/messagesInfo/messagesInfoSlice.js';
import {
  addChannel,
  setCurrentChannelId,
  deleteChannel,
  changeNameChannel,
} from '../features/channelsInfo/channelsInfoSlice.js';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();
  socket.connect();
  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
    dispatch(setCurrentChannelId(channel.id));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(deleteChannel(id));
    dispatch(deleteMessages(id));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(changeNameChannel(channel));
  });

  const withTimeout = (onSuccess, onTimeout, timeout) => {
    let called;

    const timer = setTimeout(() => {
      if (called) return;
      called = true;
      onTimeout();
    }, timeout);

    return (...args) => {
      if (called) return;
      called = true;
      clearTimeout(timer);
      onSuccess.apply(this, args);
    };
  };

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, withTimeout(() => {
      console.log('success!');
    }, () => {
      console.log('timeout!');
    }, 1000));
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel, withTimeout(() => {
      console.log('success!');
    }, () => {
      console.log('timeout!');
    }, 1000));
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, withTimeout(() => {
      console.log('success!');
    }, () => {
      console.log('timeout!');
    }, 1000));
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, withTimeout(() => {
      console.log('success!');
    }, () => {
      console.log('timeout!');
    }, 1000));
  };

  return (
    <socketContext.Provider value={{
      sendMessage,
      createChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </socketContext.Provider>
  );
};

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
  const auth = useAuth();

  return (
    <SocketProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar className="mb-3 navbar navbar-expand-lg navbar-dark bg-dark">
            <Nav.Link className="mr-auto navbar-brand" as={Link} to="/">Hexlet Chat</Nav.Link>
            {auth.user && <Button variant="outline-light" onClick={auth.logOut}>Выйти</Button>}
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
    </SocketProvider>
  );
};

export default App;
