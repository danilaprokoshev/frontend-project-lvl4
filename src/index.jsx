// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './store.js';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import SocketProvider from './components/SocketProvider.jsx';

import i18n from './components/i18n.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const mountNode = document.querySelector('#chat');
ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <SocketProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SocketProvider>
    </I18nextProvider>
  </Provider>,
  mountNode,
);
