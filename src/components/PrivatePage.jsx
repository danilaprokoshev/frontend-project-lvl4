// @ts-check

import axios from 'axios';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContent } from '../features/content/contentSlice.js';
import routes from '../routes.js';
import Channels from './chat/Channels.jsx';
import Chat from './chat/Chat.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const content = useSelector((state) => state.content.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      // TODO: добавить обработку ошибок
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      dispatch(addContent(data));
    };

    fetchContent();
  }, []);
  console.log(content);
  return _.isEmpty(content)
    ? null
    : (
      <div className="row flex-grow-1 h-75 pb-3">
        <div className="col-3 border-right">
          <Channels />
        </div>
        <div className="col h-100">
          <Chat />
        </div>
      </div>
    );
};

export default PrivatePage;
