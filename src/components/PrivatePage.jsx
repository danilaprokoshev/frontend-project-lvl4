// @ts-check

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { addChannels, setCurrentChannelId } from '../slices/channelsInfo/channelsInfoSlice.js';
import { addMessages } from '../slices/messagesInfo/messagesInfoSlice.js';
import routes from '../routes.js';
import Channels from './chat/Channels.jsx';
import Chat from './chat/Chat.jsx';
import useAuth from '../hooks/authorization.jsx';

const PrivatePage = () => {
  const auth = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          history.replace('/login');
        }
      }
    };

    fetchContent();

    return () => {
      setLoading(false);
    };
  });

  return (
    <>
      {isLoading
        ? (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )
        : (
          <div className="container flex-grow-1 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white">
              <div className="col-2 px-0 pt-5 border-end bg-light">
                <Channels />
              </div>
              <div className="col p-0 h-100">
                <Chat />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default PrivatePage;
