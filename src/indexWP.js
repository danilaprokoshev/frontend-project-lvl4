// @ts-check

import ReactDOM from 'react-dom';
import '../assets/application.scss';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = (socketClient) => {
  const vdom = init(socketClient);

  return vdom;
};

const vdom = app();
ReactDOM.render(vdom, document.getElementById('chat'));
