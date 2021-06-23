// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../../slices/channelsInfo/channelsInfoSlice.js';
import { openModal, hideModal } from '../../slices/modal/modalSlice.js';
import getModal from '../modals/index.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const modal = useSelector((state) => state.modal);

  const handleSelectChannel = (id) => (e) => {
    e.target.blur();
    dispatch(setCurrentChannelId(id));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'adding', extra: null }));
  };

  const handleRemoveChannel = (channel) => () => {
    dispatch(openModal({ type: 'removing', extra: channel }));
  };

  const handleRenameChannel = (channel) => () => {
    dispatch(openModal({ type: 'renaming', extra: channel }));
  };

  const renderChannelTitle = (channel) => {
    const { id, name, removable } = channel;
    const buttonClasses = cn({
      'nav-link': true,
      'btn-block': !removable,
      'mb-2': !removable,
      'text-left': true,
      'flex-grow-1': removable,
      btn: true,
      'btn-light': id !== currentChannelId,
      'btn-dark': id === currentChannelId,
    });
    const dropdownButtonClasses = cn({
      'flex-grow-0': true,
      'dropdown-toggle': true,
      'dropdown-toggle-split': true,
      btn: true,
      'btn-light': id !== currentChannelId,
      'btn-dark': id === currentChannelId,
    });

    if (!removable) {
      return (
        <li key={id} className="nav-item">
          <button
            type="button"
            className={buttonClasses}
            onClick={handleSelectChannel(id)}
          >
            #&nbsp;
            {name}
          </button>
        </li>
      );
    }

    return (
      <li key={id} className="nav-item">
        <Dropdown as={ButtonGroup} className="d-flex mb-2">
          <Button
            className={buttonClasses}
            onClick={handleSelectChannel(id)}
          >
            #&nbsp;
            {name}
          </Button>
          <Dropdown.Toggle className={dropdownButtonClasses} />
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleRemoveChannel(channel)}>{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleRenameChannel(channel)}>{t('channels.rename')}</Dropdown.Item>
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

    const Modal = getModal(type);
    return <Modal onHide={handleHideModal} />;
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>{t('channels.channels')}</span>
        <button type="button" className="ml-auto p-0 text-dark btn btn-link" onClick={handleAddChannel}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.length > 0 && channels.map(renderChannelTitle)}
      </ul>
      {renderModal(modal)}
      {/* <CustomModal onHide={handleHideModal} /> */}
    </>
  );
};
export default Channels;
