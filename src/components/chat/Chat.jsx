// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/socket.jsx';
import useAuth from '../../hooks/authorization.jsx';



const Chat = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const inputRef = useRef();
  const socket = useSocket();
  const [isSubmitting, setSubmitting] = useState(false);
  const bottomRef = useRef();
  const messagesBox = useRef();
  const messagesChat = useSelector((state) => state.messagesInfo.messages);
  const messages = messagesChat
    .filter(({ channelId }) => channelId === currentChannelId)
    .map((msg) => [msg.body, msg.id, msg.username]);
  const renderMessage = ([body, id, username]) => (
    <div key={id} className="text-break">
      <b>{username}</b>
      :&nbsp;
      {body}
    </div>
  );

  useEffect(() => {
    messagesBox.current.scrollTo({ behavior: 'smooth', top: bottomRef.current.offsetTop });
  }, [messages, currentChannelId]);
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string()
        .required(t('form_errors.required')),
    }),
    validateOnBlur: false,
    onSubmit: async (values) => {
      setSubmitting(true);
      const { username } = auth.user;
      const msg = {
        ...values,
        username,
        channelId: currentChannelId,
      };
      await socket.sendMessage(msg);
      formik.resetForm();
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div ref={messagesBox} id="messages-box" className="chat-messages overflow-auto mb-3">
          {messagesChat.length > 0 && messages.map(renderMessage)}
          <div ref={bottomRef} className="messages-bottom" />
        </div>
        <div className="border-top mt-auto py-3 px-5">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <InputGroup className="has-validation">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.body}
                autoComplete="off"
                name="body"
                aria-label="body"
                data-testid="new-message"
                isInvalid={formik.errors.body}
                ref={inputRef}
              />
              <InputGroup.Append>
                <Button type="submit" disabled={isSubmitting} variant="dark">{t('chat.send')}</Button>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">{formik.errors.body}</Form.Control.Feedback>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Chat;
