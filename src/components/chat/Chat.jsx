// @ts-check

import React, {useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { newMessage } from '../../features/content/contentSlice.js';
import * as yup from 'yup';

const Chat = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string()
        .required('Required'),
    }),
    validateOnBlur: false,
    onSubmit: (values) => {
      // const message =
      dispatch(newMessage(message));
      formik.resetForm();
    },
  });

  const content = useSelector((state) => state.content.value);
  const messages = content.messages
    .map((msg) => [msg.id, msg.author, msg.text]);

  const renderMessage = ([id, author, text]) => (
    <div key={id} className="text-break">
      <b>{author}</b>
      :
      {text}
    </div>
  );

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.length > 0 && messages.map(renderMessage)}
        </div>
        <div className="mt-auto">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <InputGroup className="has-validation">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.body}
                name="body"
                aria-label="body"
                isInvalid={formik.errors.body}
                ref={inputRef}
              />
              <InputGroup.Append>
                <Button type="submit" variant="primary">Отправить</Button>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Chat;
