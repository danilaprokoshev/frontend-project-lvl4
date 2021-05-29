// @ts-check

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async (socketClient) => init(socketClient);

export default app;
