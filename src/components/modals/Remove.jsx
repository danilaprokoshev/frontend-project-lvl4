// @ts-check

import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/socket.jsx';

const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const channel = useSelector((state) => state.modal.extra);
  const socket = useSocket();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const [isSubmitting, setSubmitting] = useState(false);
  const handleRemoveChannel = async () => {
    setSubmitting(true);
    await socket.removeChannel(channel);
    setSubmitting(false);
    onHide();
  };

  return (
    <Modal show={isOpened} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removing.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('modals.removing.body')}
        <div className="d-flex justify-content-between">
          <Button className="mr-2 btn btn-secondary" onClick={onHide}>
            {t('modals.removing.cancel')}
          </Button>
          <Button variant="danger" disabled={isSubmitting} onClick={handleRemoveChannel}>
            {t('modals.removing.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
