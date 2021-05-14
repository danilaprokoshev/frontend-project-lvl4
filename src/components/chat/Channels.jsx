// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../../features/channelsInfo/channelsInfoSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const channelTitles = channels
    .map((ch) => [ch.id, ch.name]);

  const handleSelectChannel = (id) => (e) => {
    e.target.blur();
    dispatch(setCurrentChannelId(id));
  };

  const renderChannelTitle = ([channelId, channelName]) => {
    const buttonClasses = {
      'nav-link': true,
      'btn-block': true,
      'mb-2': true,
      'text-left': true,
      btn: true,
      'btn-light': channelId !== currentChannelId,
      'btn-primary': channelId === currentChannelId,
    };

    return (
      <li key={channelId} className="nav-item">
        <button type="button" className={cn(buttonClasses)} onClick={handleSelectChannel(channelId)}>{channelName}</button>
      </li>
    );
  };

  return (
    <>
      <div className="d-flex mb-2">
        <span>Каналы</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channelTitles.length > 0 && channelTitles.map(renderChannelTitle)}
      </ul>
    </>
  );
};

export default Channels;
