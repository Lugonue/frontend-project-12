import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utils/webSocket";

import { addMessage } from "../../slices/messagesSlice";
import InputMessage from "../ui/InputMessage";

const Header = ({ messageCount, t }) => {
  const channelName = useSelector((state) => state.channels.activeChannelName);
  const getKey = () => {
    switch(Number(messageCount)) {
      case (3 || 4 || 5): return "main.message_many";
      case 1: return "main.message_one";
      default: return "main.message_many";
    }
  }
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{channelName}</b>
      </p>
      <span className="text-muted">{t(getKey(), { count: messageCount })}</span>
    </div>
  );
};

const ChatComponent = ({ t }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) =>
    Object.values(state.messages.entities).filter(
      (m) => m.channelId === state.channels.activeChannelId
    )
  );

  useEffect(() => {
    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <Header messageCount={messages.length} t={t} />
      </div>

      <div className="chat-messages overflow-auto px-5 h-100 ">
        {messages.map((message) => (
          <div key={message.id} className="d-flex justify-content-start px-2">
            <p>
              <b>{message.username}:</b> {message.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-auto px-5">
        <InputMessage t={t} />
      </div>
    </div>
  );
};

export default ChatComponent;
