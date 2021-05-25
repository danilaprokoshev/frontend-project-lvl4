// @ts-check

import ReactDOM from 'react-dom';
import '../assets/application.scss';
import { io } from 'socket.io-client';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = (socketClient = io) => {
  const vdom = init(socketClient);

  return vdom;
};

const vdom = app();
ReactDOM.render(vdom, document.getElementById('chat'));
