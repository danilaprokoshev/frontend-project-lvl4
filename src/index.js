// @ts-check

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = (socketClient) => {
  const vdom = init(socketClient);

  return vdom;
};

export default app;
