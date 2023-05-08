import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import socket from '../../utils/webSocket';



const InputNewChannel = () => {

  const formik = useFormik({
    initialValues: {
      channelName: '',
      error: '',
    },
    onSubmit: (values) => {
      console.log(values.channelName);
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Введите название канала"
          name='channelName'
          id='channelName'
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group className="d-flex justify-content-end" >
        <Button variant="secondary" className="me-2">
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