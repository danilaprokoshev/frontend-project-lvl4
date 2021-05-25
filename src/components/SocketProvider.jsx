// @ts-check

import React from 'react';
import socketContext from '../contexts/socket.jsx';

const SocketProvider = ({ socket, children }) => {
  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      console.log(response.status);
    });
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      console.log(response.status);
    });
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

export default SocketProvider;
