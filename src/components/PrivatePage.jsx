// @ts-check

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const fetchContent = async () => {
      // TODO: добавить обработку ошибок
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setContent((prevState) => ({
        ...prevState,
        ...data,
      }));
    };

    fetchContent();
  }, []);

  return <p>{JSON.stringify(content)}</p>;
};

export default PrivatePage;
