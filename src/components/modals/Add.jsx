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
import useSocket from '../../hooks/socket.jsx';

const Add = ({ onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channelsNames = useSelector((state) => state
    .channelsInfo
    .channels
    .map((ch) => ch.name));
  const formik = useFormik({
    initialValues: {
      body: '',
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
    onSubmit: (values, { setSubmitting }) => {
      const channel = {
        name: values.body,
      };
      socket.createChannel(channel);
      setSubmitting(false);
      onHide();
    },
  });

  return (
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
  );
};

export default Add;
