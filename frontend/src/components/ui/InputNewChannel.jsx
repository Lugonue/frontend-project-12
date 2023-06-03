import { useFormik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { actions as channelsActions } from '../../slices/channelsSlice';
import socket from '../../utils/webSocket';

const InputNewChannel = ({ handleClose, toast, t }) => {
  const dispatch = useDispatch();

  const input = useRef(null);
  const [formState, setFormState] = useState({
    importError: null,
    buttnDisabled: false,
  });
  const channelNames = useSelector((state) => state.channels.channels.map((c) => c.name));

  const formik = useFormik({
    initialValues: {
      body: '',
      error: null,
    },
    validationSchema: yup.object({
      body: yup.string().required(t('errors.required')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ body }) => {
      setFormState({
        ...formState,
        buttnDisabled: true,
      });

      if (channelNames.includes(body)) {
        setFormState({
          ...formState,
          importError: t('errors.channelExists'),
        });
        return;
      }
      const sendToServer = () => {
        socket.emit('newChannel', { name: body }, ({ status, data }) => {
          if (status !== 'ok') {
            toast.error(t('toastify.error'));
            sendToServer();
          } else {
            dispatch(channelsActions.setActiveChannel(data));
            handleClose();
            formik.resetForm();
            toast(t('toastify.add'));
          }
          setFormState({
            importError: null,
            buttnDisabled: false,
          });
        });
      };
      sendToServer();
    },
  });

  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        {formState.importError && <Form.Text className="text-danger">{formState.importError}</Form.Text>}
        <FloatingLabel
          controlId="body"
          label={t('modal.channelName')}
          className="mb-4"
        >
          <Form.Control
            ref={input}
            type="text"
            placeholder="Введите название канала"
            name="body"
            controlId="body"
            onChange={formik.handleChange}
            isInvalid={formik.values.error}
          />
        </FloatingLabel>

      </Form.Group>

      <Form.Group className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleClose}>
          {t('modal.btnCancel')}
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={formState.buttnDisabled}
        >

          {t('modal.btnSubmit')}

        </Button>
      </Form.Group>
    </Form>
  );
};

export default InputNewChannel;
