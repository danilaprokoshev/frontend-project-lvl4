// @ts-check

import React, { useState } from 'react';
import authContext from '../contexts/authorization.jsx';

const AuthProvider = ({ children }) => {
  const getUser = () => {
    const userInfo = localStorage.getItem('userId');
    if (userInfo) {
      const { username } = JSON.parse(userInfo);
      return { username };
    }

    return null;
  };

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

  return (
    <authContext.Provider value={{ logIn, logOut, user }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
