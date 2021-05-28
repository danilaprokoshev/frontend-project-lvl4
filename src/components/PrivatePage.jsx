// @ts-check

import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addChannels, setCurrentChannelId } from '../features/channelsInfo/channelsInfoSlice.js';
import { addMessages } from '../features/messagesInfo/messagesInfoSlice.js';
import routes from '../routes.js';
import Channels from './chat/Channels.jsx';
import Chat from './chat/Chat.jsx';
import useAuth from '../hooks/authorization.jsx';

const PrivatePage = () => {
  const auth = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const {
          data: {
            channels,
            messages,
            currentChannelId,
          },
        } = await axios
          .get(routes.usersPath(), { headers: auth.getAuthHeader() });
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        dispatch(setCurrentChannelId(currentChannelId));
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          history.replace('/login');
        }
      }
    };

    fetchContent();
  });

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
