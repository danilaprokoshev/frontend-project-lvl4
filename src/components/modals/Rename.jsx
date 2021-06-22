// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/socket.jsx';

const Rename = ({ onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const channel = useSelector((state) => state.modal.extra);
  const inputRef = useRef();
  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const isOpened = useSelector((state) => state.modal.isOpened);
  const modal = useSelector((state) => state.modal);
  const channelsNames = useSelector((state) => state
    .channelsInfo
    .channels
    .map((ch) => ch.name));

  const formik = useFormik({
    initialValues: {
      body: modal.extra.name,
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
    onSubmit: async (values) => {
      setSubmitting(true);
      const { id } = channel;
      const renamedChannel = {
        id,
        name: values.body,
      };
      await socket.renameChannel(renamedChannel);
      setSubmitting(false);
      onHide();
    },
  });

  return (
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
            <Button type="submit" disabled={isSubmitting} variant="dark">
              {t('modals.renaming.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
