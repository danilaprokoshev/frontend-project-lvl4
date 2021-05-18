// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { setCurrentChannelId } from '../../features/channelsInfo/channelsInfoSlice.js';
import { openModal, hideModal } from '../../features/modal/modalSlice.js';
import getModal from '../modals/index.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const modal = useSelector((state) => state.modal);
  const channelTitles = channels
    .map((ch) => [ch.id, ch.name, ch.removable]);

  const handleSelectChannel = (id) => (e) => {
    e.target.blur();
    dispatch(setCurrentChannelId(id));
  };

  const handleAddChannel = () => {
    dispatch(openModal('adding'));
  };

  const handleRemoveChannel = () => {
    dispatch(openModal('removing'));
  };

  const renderChannelTitle = ([channelId, channelName, removable]) => {
    const buttonClasses = cn({
      'nav-link': true,
      'btn-block': !removable,
      'mb-2': !removable,
      'text-left': true,
      'flex-grow-1': removable,
      btn: true,
      'btn-light': channelId !== currentChannelId,
      'btn-primary': channelId === currentChannelId,
    });
    const dropdownButtonClasses = cn({
      'flex-grow-0': true,
      'dropdown-toggle': true,
      'dropdown-toggle-split': true,
      btn: true,
      'btn-light': channelId !== currentChannelId,
      'btn-primary': channelId === currentChannelId,
    });

    if (!removable) {
      return (
        <li key={channelId} className="nav-item">
          <button
            type="button"
            className={buttonClasses}
            onClick={handleSelectChannel(channelId)}
          >
            {channelName}
          </button>
        </li>
      );
    }

    return (
      <li key={channelId} className="nav-item">
        <Dropdown as={ButtonGroup} className="d-flex mb-2">
          <Button
            className={buttonClasses}
            onClick={handleSelectChannel(channelId)}
          >
            {channelName}
          </Button>
          <Dropdown.Toggle className={dropdownButtonClasses} />
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleRemoveChannel}>Удалить</Dropdown.Item>
            <Dropdown.Item href="#">Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  };

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const renderModal = ({ isOpened, type }) => {
    if (!isOpened) {
      return null;
    }

    const Component = getModal(type);
    return <Component onHide={handleHideModal} />;
  };

  return (
    <>
      <div className="d-flex mb-2">
        <span>Каналы</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channelTitles.length > 0 && channelTitles.map(renderChannelTitle)}
      </ul>
      {renderModal(modal)}
    </>
  );
};

export default Channels;
