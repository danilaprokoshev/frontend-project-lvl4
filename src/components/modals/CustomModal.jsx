// @ts-check

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/authorization.jsx';
import useSocket from '../../hooks/socket.jsx';

const renderSettingsByType = {
  adding: ({ isOpened }, onHide, t, formik, inputRef) => (
    <Modal show={isOpened} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.adding.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="add-channel"
              isInvalid={formik.errors.body}
              name="body"
            />
            <FormControl.Feedback
              type="invalid"
            >
              {formik.errors.body}
            </FormControl.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button className="mr-2 btn btn-secondary" onClick={onHide}>
              {t('modals.adding.cancel')}
            </Button>
            <Button type="submit" variant="dark">
              {t('modals.adding.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  ),
  renaming: ({ isOpened }, onHide, t, formik, inputRef) => (
    <Modal show={isOpened} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renaming.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="rename-channel"
              isInvalid={formik.errors.body}
              name="body"
            />
            <FormControl.Feedback
              type="invalid"
            >
              {formik.errors.body}
            </FormControl.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button className="mr-2 btn btn-secondary" onClick={onHide}>
              {t('modals.renaming.cancel')}
            </Button>
            <Button type="submit" variant="dark">
              {t('modals.renaming.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  ),
  removing: ({ isOpened }, onHide, t, formik) => (
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
          <Button variant="danger" onClick={formik.handleSubmit}>
            {t('modals.removing.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  ),
};

const CustomModal = ({ modal, onHide }) => {
  if (!modal.type) {
    return null;
  }
  const { t } = useTranslation();
  const auth = useAuth();
  const socket = useSocket();
  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
  const channelsNames = useSelector((state) => state
    .channelsInfo
    .channels
    .map((ch) => ch.name));
  const channel = modal.extra;
  const SubmitSettingsByType = {
    adding: (values, { setSubmitting }) => {
      const newChannel = {
        name: values.body,
        creator: auth.user.username,
      };
      socket.createChannel(newChannel);
      setSubmitting(false);
      onHide();
    },
    renaming: (values, { setSubmitting }) => {
      const { id } = channel;
      const renamedChannel = {
        id,
        name: values.body,
      };
      socket.renameChannel(renamedChannel);
      setSubmitting(false);
      onHide();
    },
    removing: () => {
      socket.removeChannel(channel);
      onHide();
    },
  };
  const getFormik = ({
    type,
    extra,
  }) => useFormik({
    initialValues: {
      body: extra ? extra.name : '',
    },
    validationSchema: yup.object({
      body: yup.string()
        .required(t('form_errors.required'))
        .min(3, t('form_errors.required_length'))
        .max(20, t('form_errors.required_length'))
        .notOneOf(channelsNames, t('form_errors.unique_item')),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: SubmitSettingsByType[type],
  });
  const formik = getFormik(modal);
  const render = renderSettingsByType[modal.type];

  return render(modal, onHide, t, formik, inputRef);
};

export default CustomModal;
