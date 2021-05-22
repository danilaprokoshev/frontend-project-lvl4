// @ts-check

import React, { useState } from 'react';
import authContext from '../contexts/authorization.jsx';

const getUser = () => {
  const userInfo = localStorage.getItem('userId');
  if (userInfo) {
    const { username } = JSON.parse(userInfo);
    return { username };
  }

  return null;
};

const AuthProvider = ({ children }) => {
  const initialState = getUser();
  const [user, setUser] = useState(initialState);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    const { username } = data;
    setUser({
      username,
    });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  return (
    <authContext.Provider value={{
      getAuthHeader,
      logIn,
      logOut,
      user,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
