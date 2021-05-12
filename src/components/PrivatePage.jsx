// @ts-check

import axios from 'axios';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChannel, setCurrentChannelId } from '../features/channelsInfo/channelsInfoSlice.js';
import { addMessage } from '../features/messagesInfo/messagesInfoSlice';
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
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      // TODO: добавить обработку ошибок
      const { data: { channels, messages, currentChannelId } } = await axios
        .get(routes.usersPath(), { headers: getAuthHeader() });
      dispatch(addChannel(channels));
      dispatch(addMessage(messages));
      dispatch(setCurrentChannelId(currentChannelId));
    };

    fetchContent();
  }, []);

  // const channels = useSelector((state) => state.channelsInfo.channels);
  // const messages = useSelector((state) => state.messagesInfo.messages);
  return (
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
