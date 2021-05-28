// @ts-check

import React from 'react';
import socketContext from '../contexts/socket.jsx';

const SocketProvider = ({
  sendMessage,
  createChannel,
  removeChannel,
  renameChannel,
  children,
}) => (
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

export default SocketProvider;
