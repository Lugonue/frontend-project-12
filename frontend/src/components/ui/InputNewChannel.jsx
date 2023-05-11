import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import socket from '../../utils/webSocket';
import { addNewChannel } from '../../slices/channelsSlice';
import { useDispatch, useSelector } from 'react-redux';





const InputNewChannel = ({closeHandler}) => {
  const dispatch = useDispatch();
  const channelNames = useSelector(state => state.channels.channels.map(c => c.name));

  const formik = useFormik({
    initialValues: {
      channelName: '',
      error: '',
    },
    onSubmit: (values) => {
      console.log(channelNames);
      if (channelNames.includes(values.channelName)) {
        formik.values.error = 'такой канал уже есть';
        return;
      };
      const sendToServer = async (channelName) => {
        await socket.emit('newChannel', {name: values.channelName}, (response) => {
          if (response.status !== 'ok') {
            sendToServer(channelName)
          } else {
           dispatch(addNewChannel(response.data));
           closeHandler();
           formik.values.error = '';
           formik.resetForm();
          }
      })
      }
      sendToServer(values.channelName);
  }});

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        {formik.values.error === '' ?
         null 
         : <Form.Text className="text-danger">{formik.values.error}</Form.Text>}
        <Form.Control
          type="text"
          placeholder="Введите название канала"
          name='channelName'
          id='channelName'
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group className="d-flex justify-content-end" >
        <Button variant="secondary" className="me-2" onClick={closeHandler}>
          Отменить
        </Button>
        <Button variant="primary" type="submit">
          Отправить
        </Button>
      </Form.Group>

    </Form>
  )
}


export default InputNewChannel;