// @ts-check

import ReactDOM from 'react-dom';
import '../assets/application.scss';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async (socketClient) => {
  const vdom = await init(socketClient);
  // ReactDOM.render(vdom, document.getElementById('chat'));
  return vdom;
  // ReactDOM.render(vdom, document.getElementById('chat'));
};
export default app;

//const vdom = await app();
//ReactDOM.render(vdom, document.getElementById('chat'));
// await app();
