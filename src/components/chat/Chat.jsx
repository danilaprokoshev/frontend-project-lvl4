// @ts-check

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import useSocket from '../../hooks/socket.jsx';

const Chat = () => {
  // TODO: вынести селекторы в отдельный модуль, и переиспользовать каждый раз
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const getUsername = () => {
    const user = localStorage.getItem('userId');
    const userInfo = JSON.parse(user);

    return userInfo.username;
  };

  const inputRef = useRef();
  const socket = useSocket();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string()
        .required('Обязательное поле'),
    }),
    validateOnBlur: false,
    onSubmit: (values) => {
      const username = getUsername();
      const msg = {
        ...values,
        username,
        channelId: currentChannelId,
      };
      socket.sendMessage(msg);
      formik.resetForm();
    },
  });

  const messagesChat = useSelector((state) => state.messagesInfo.messages);
  const messages = messagesChat
    .filter(({ channelId }) => channelId === currentChannelId)
    .map((msg) => [msg.body, msg.id, msg.username]);
  // TODO: добавить скроллинг вниз, когда сообщений много
  const renderMessage = ([body, id, username]) => (
    <div key={id} className="text-break">
      <b>{username}</b>
      :&nbsp;
      {body}
    </div>
  );

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messagesChat.length > 0 && messages.map(renderMessage)}
        </div>
        <div className="mt-auto">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <InputGroup className="has-validation">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.body}
                name="body"
                aria-label="body"
                data-testid="new-message"
                isInvalid={formik.errors.body}
                ref={inputRef}
              />
              <InputGroup.Append>
                <Button type="submit" variant="dark">Отправить</Button>
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
