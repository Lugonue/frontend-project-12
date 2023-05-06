import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utils/webSocket";
import { addMessage } from "../../slices/messagesSlice";



const InputMessage = () => {
  const dispatch = useDispatch();
  const channelId = useSelector(state => state.channels.activeChannel.id);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
        const message = {
          body: values.message,
          channelId,
          username: 'admin',
        };
        
        sendToServer(message);

        formik.values.message = '';
    },
  })

  const sendToServer = async (message) => {
    await socket.emit('newMessage', message, (response) => {
      if (response.status !== 'ok') {
        sendToServer(message)
      }
    });
  }

  return (
    <form className='d-flex p-2' onSubmit={formik.handleSubmit}>
      <input type="text"
        id="message"
        className="form-control"
        placeholder="Enter message"
        onChange={formik.handleChange}
        value={formik.values.message}
      />
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  )
}

export default InputMessage;