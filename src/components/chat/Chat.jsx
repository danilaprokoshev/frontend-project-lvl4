// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

const Chat = () => {
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
          <form noValidate="" className="">
            <div className="input-group">
              <input name="body" aria-label="body" className="form-control" value="" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">Отправить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
