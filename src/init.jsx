// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './store.js';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import SocketProvider from './components/SocketProvider.jsx';

import i18n from './components/i18n.js';
import useAuth from './hooks/authorization.jsx';
import { addMessage, deleteMessages } from './features/messagesInfo/messagesInfoSlice';
import {
  addChannel, changeNameChannel,
  deleteChannel,
  setCurrentChannelId,
} from './features/channelsInfo/channelsInfoSlice';

export default (socketClient) => {
  // const { user } = useAuth();
  // const dispatch = useDispatch();
  const socket = socketClient;
  socket.on('newMessage', (msg) => {
    store.dispatch(addMessage(msg));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
    store.dispatch(setCurrentChannelId(channel.id));
    // if (user) {
    //   if (user.username === channel.creator) {
    //     dispatch(setCurrentChannelId(channel.id));
    //   }
    // }
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel(id));
    store.dispatch(deleteMessages(id));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(changeNameChannel(channel));
  });
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};
