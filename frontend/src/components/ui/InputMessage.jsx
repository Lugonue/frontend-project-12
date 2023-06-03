import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import filter from 'leo-profanity';
import * as yup from 'yup';
import socket from '../../utils/webSocket';

const InputMessage = ({ t }) => {
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const username = useSelector((state) => state.userState.currentUser.name);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string().required(t('required')),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      const message = {
        body: filter.clean(values.body),
        channelId,
        username,
      };
      const sendToServer = () => {
        socket.emit('newMessage', message, (response) => {
          if (response.status !== 'ok') {
            sendToServer();
          } else {
            formik.resetForm();
            setIsSubmitting(false);
          }
        });
      };
      sendToServer(message);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <Form.Control
            ref={inputRef}
            className="border-0 p-0 ps-2"
            name="body"
            type="text"
            placeholder={t('main.chat')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
            aria-label="Новое сообщение"
          />
          <Button
            type="submit"
            className="btn-group-vertical"
            variant=""
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default InputMessage;
