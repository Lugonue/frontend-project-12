import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utils/webSocket";

import { addMessage } from "../../slices/messagesSlice";
import InputMessage from "./InputMessage";

const Header = ({ messageCount }) => {
  const channelName = useSelector((state) => state.channels.activeChannel.name);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{channelName}</b>
      </p>
      <span className="text-muted">{messageCount} сообщений</span>
    </div>
  );
};

const ChatFrame = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) =>
    Object.values(state.messages.entities).filter(
      (m) => m.channelId === state.channels.activeChannel.id
    )
  );

  useEffect(() => {
    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
      <Header messageCount={messages.length} />
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
        <InputMessage />
      </div>
    </div>
  );
};

export default ChatFrame;
