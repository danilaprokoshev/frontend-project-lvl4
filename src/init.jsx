// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './store.js';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import SocketProvider from './components/SocketProvider.jsx';

import i18n from './components/i18n.js';

export default async (socketClient = io()) => {

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <SocketProvider socket={socketClient}>
            <App />
          </SocketProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};