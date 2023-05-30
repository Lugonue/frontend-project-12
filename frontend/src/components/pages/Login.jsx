import * as yup from 'yup';
import { Form, Button, Image, FloatingLabel, Card, Row, Container, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../styles/login.css';
import { useEffect, useRef, useState } from 'react';

import { setAuthorized, setCurrentUser } from '../../slices/stateSlice';
import Header from '../ui/Header';
import image from '../../assets/LoginImg.jpg';
import routes from '../../routes';




const Login = ({ toast, t }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRef = useRef();
  const [error401, setError401] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({ //valudation shema for formik
    name: yup.string().required(t("errors.required")),
    password: yup.string().required(t("errors.required")),
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(routes.loginPath(), values);

        //сохраняем токен полученный от сервера в локальное хранилище 
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);

        //Подтверждаем аторизацию, перенаправляем пользователя на стартовую страницу с активными каналами и сообщениями
        dispatch(setAuthorized(true));
        toast.success(t('Вы успешно авторизовались'));
        dispatch(setCurrentUser({ name: response.data.username }));
        navigate('/');

      } catch (error) {
        if (error.response.status === 401) {
          setError401(true);
          toast.error(t('errors.loginError'));
        }
      }
    },
  })

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body as={Row} className="p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image roundedCircle src={image} alt={t('login.title')} />
                </Col>
                <Col as={Form} xs={12} md={6} className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('login.title')}</h1>
                  <FloatingLabel
                    controlId="username"
                    label={t('login.username')}
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      ref={inputRef}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      name="username"
                      placeholder={t('login.username')}
                      isInvalid={error401}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label={t('login.password')}
                    className="mb-4"
                  >
                    <Form.Control
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      name="password"
                      type="password"
                      placeholder={t('login.password')}
                      isInvalid={error401}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t('errors.loginError')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    variant="outline-primary"
                    disabled={isSubmitting}
                  >
                    {t('login.btn')}
                  </Button>
                </Col>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('login.footerFirst')}</span>
                  <Link to="/signup">{t('login.footerSecond')}</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  )
}

export default Login;