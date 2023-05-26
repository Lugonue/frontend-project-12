import { useFormik } from "formik";
import { useSelector } from "react-redux";

import socket from "../../utils/webSocket";



const InputMessage = () => {

  const channelId = useSelector(state => state.channels.activeChannel.id); 
  const username = useSelector(state => state.userState.currentUser.name);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {

      if (values.message.length === 0) return;

      const message = {
        body: values.message,
        channelId,
        username,
      };

      const sendToServer = (message) => {
        socket.emit('newMessage', message, (response) => {
          if (response.status !== 'ok') {
            sendToServer(message)
          } else {
            formik.resetForm();
          }
        });
      }
      sendToServer(message);
    },
  })

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