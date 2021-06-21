// @ts-check

import ReactDOM from 'react-dom';
import '../assets/application.scss';
import { io } from 'socket.io-client';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const appInstance = async (socketClient = io()) => {
  const virtualDom = await init(socketClient);
  ReactDOM.render(virtualDom, document.getElementById('chat'));
};

appInstance();

const app = async (socketClient) => init(socketClient);

export default app;
