// @ts-check

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
import { addMessage, deleteMessages } from '../features/messagesInfo/messagesInfoSlice.js';
import {
  addChannel,
  changeNameChannel,
  deleteChannel,
  setCurrentChannelId,
} from '../features/channelsInfo/channelsInfoSlice.js';
import socketContext from '../contexts/socket.jsx';
import useAuth from '../hooks/authorization.jsx';

const SocketProvider = ({ socket, children }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
    if (user) {
      if (user.username === channel.creator) {
        dispatch(setCurrentChannelId(channel.id));
      }
    }
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

export default SocketProvider;
