// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const content = useSelector((state) => state.content.value);
  const channelTitles = content.channels
    .map((ch) => [ch.id, ch.name]);

  const renderChannelTitle = ([channelId, channelName]) => (
    <li key={channelId} className="nav-item">
      <button type="button" className="nav-link btn-block mb-2 text-left btn btn-light">{channelName}</button>
    </li>
  );

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
