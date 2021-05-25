// @ts-check

import ReactDOM from 'react-dom';
import '../assets/application.scss';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default async (socketClient) => {
  const vdom = await init(socketClient);

  ReactDOM.render(vdom, document.getElementById('chat'));
};

// render();
