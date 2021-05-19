// @ts-check

import React, { useEffect, useRef } from 'react';
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
import useSocket from '../../hooks/socket.jsx';

const Rename = ({ onHide }) => {
  const socket = useSocket();
  const channel = useSelector((state) => state.modal.extra);
  const inputRef = useRef();
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
        .required('Required')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channelsNames, 'Должно быть уникальным'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      const { id } = channel;
      const renamedChannel = {
        id,
        name: values.body,
      };
      socket.renameChannel(renamedChannel);
      setSubmitting(false);
      onHide();
    },
  });

  return (
    <Modal show={isOpened} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
