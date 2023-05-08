import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/webSocket";

import {addMessage} from "../slices/messagesSlice";

const Header = ({messageCount}) => {

  const channelName = useSelector(state => state.channels.activeChannel.name)
 

  return (
    <div className='bg-light mb-4 p-3 shadow-sm small'>
      <p className="m-0">
        <b>{channelName}</b>
      </p>
      <span className="text-muted">{messageCount} сообщений</span>
    </div>
  )
}



const ChatFrame = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => Object.values(state.messages.entities).filter(m => m.channelId === state.channels.activeChannel.id));

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message))
    })
  }, [])

  return (
    <>
    <Header messageCount={messages.length}/>
    <div className="w-100 h-100">
      {messages.map(message => (
        <div key={message.id} className="d-flex justify-content-start px-2">
          <p><b>{message.username}:</b> {message.body}</p>
        </div>
      ))}
    </div>
    </>
  )
}


export default ChatFrame;