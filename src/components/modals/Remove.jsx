// @ts-check

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/socket.jsx';

const Remove = ({ onHide }) => {
  const channel = useSelector((state) => state.modal.extra);
  const socket = useSocket();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const handleRemoveChannel = () => {
    socket.removeChannel(channel);
    onHide();
  };

  return (
    <Modal show={isOpened} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Уверены?
        <div className="d-flex justify-content-between">
          <Button className="mr-2 btn btn-secondary" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="danger" onClick={handleRemoveChannel}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
