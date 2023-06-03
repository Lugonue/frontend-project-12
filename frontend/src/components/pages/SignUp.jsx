import { useFormik } from 'formik';
import {
  Form, Button, Image, FloatingLabel, Card, Row, Container, Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { setAuthorized, setCurrentUser } from '../../slices/stateSlice';
import Header from '../regions/Header';
import routes from '../../routes';
import image from '../../assets/RegisterImg.jpg';

const SignUp = ({ toast, t }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef();

  const [isSubmitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({ // valudation shema for formik
      username: yup.string().required('Name is required').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
      password: yup.string().required('Password is required').min(6, 'Не менее 6 символов'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      setSubmitting(true);
      const sendToServer = async () => {
        const request = {
          username: values.username,
          password: values.password,
        };
        try {
          const { data } = await axios.post(routes.signUpPath(), request);

          // регистрация нового пользователя. Добавляем токен и переходим на главную страницу
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);

          dispatch(setAuthorized(true));
          dispatch(setCurrentUser({ name: data.username }));
          toast.success(t('Регистрация прошла успешно'));
          navigate('/');
        } catch (e) {
          if (e.response.status === 409) {
            toast.error(t('errors.registerError'));
          }
          setSubmitting(false);
        }
      };
      sendToServer(values);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body as={Row} className="p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image roundedCircle src={image} alt={t('register.title')} />
                </Col>
                <Col as={Form} xs={12} md={6} className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('register.title')}</h1>
                  <FloatingLabel
                    controlId="username"
                    label={t('register.username')}
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      ref={inputRef}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      name="username"
                      placeholder={t('register.username')}
                      isInvalid={formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label={t('register.password')}
                    className="mb-4"
                  >
                    <Form.Control
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      name="password"
                      type="password"
                      placeholder={t('register.password')}
                      isInvalid={(formik.errors.password && formik.touched.password)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="confirmPassword"
                    label={t('register.confirmPassword')}
                    className="mb-4"
                  >
                    <Form.Control
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      name="confirmPassword"
                      type="password"
                      placeholder={t('register.confirmPassword')}
                      isInvalid={formik.errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword || t('errors.registerError')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    variant="outline-primary"
                    disabled={isSubmitting}
                  >
                    {t('register.btn')}
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
