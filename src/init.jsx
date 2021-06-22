// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import getStoreInstance from './store.js';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import SocketProvider from './components/SocketProvider.jsx';
import getI18nInstance from './lib/i18n.js';
import { addMessage, deleteMessages } from './slices/messagesInfo/messagesInfoSlice';
import {
  addChannel, changeNameChannel,
  deleteChannel,
  setCurrentChannelId,
} from './slices/channelsInfo/channelsInfoSlice';
import getPostClientPostItemAccessToken from './config/prod.js';

const init = async (socketClient) => {
  const store = getStoreInstance();
  const rollbarConfig = {
    accessToken: getPostClientPostItemAccessToken(),
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };
  const i18nInstance = await getI18nInstance();
  const socket = socketClient;
  socket.on('newMessage', (msg) => {
    store.dispatch(addMessage(msg));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
    store.dispatch(setCurrentChannelId(channel.id));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel(id));
    store.dispatch(deleteMessages(id));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(changeNameChannel(channel));
  });

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
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nInstance}>
            <AuthProvider>
              <SocketProvider
                sendMessage={sendMessage}
                createChannel={createChannel}
                removeChannel={removeChannel}
                renameChannel={renameChannel}
              >
                <App />
              </SocketProvider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
