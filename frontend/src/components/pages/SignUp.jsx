import { useFormik } from "formik";
import { Form, Button, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from "react-redux";

import { setAuthorized, setCurrentUser } from "../../slices/stateSlice";
import Header from "../ui/Header";
import { useTranslation } from "react-i18next";


const SignUp = ({ toast }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = yup.object().shape({ //valudation shema for formik
    username: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long').max(20, 'Name must be at most 20 characters long'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: (values) => {
      const sendToServer = async (values) => {
        const request = {
          username: values.username,
          password: values.password
        }
        try {
          const { data } = await axios.post('/api/v1/signup', request);

          // регистрация нового пользователя. Добавляем токен и переходим на главную страницу
          dispatch(setAuthorized(true));
          dispatch(setCurrentUser({ name: data.username }));
          toast.success(t('Регистрация прошла успешно'));
          navigate('/');


        } catch (e) {
          if (e.response.status === 409) {
            toast.error(t('Пользователь с таким именем уже существует'));
          }
        }
      }
      sendToServer(values);
    }
  }
  );

  return (
    <div className="container-fluid bg-light h-100">
      <div className="row h-100 align-items-start justify-content-center">
        <Header />
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <h3 className="card-header text-center">{t('Регистрация')}</h3>
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="col-6">
                <div className="h-100">
                  <Image className="img-fluid" src="https://seoquick.com.ua/wp-content/uploads/2020/07/site-registration-in-search-engines.png" />
                </div>

              </div>
              <div className="col-6">
                <div className="">
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="d-flex flex-column">
                      {formik.errors.username ? <Form.Text className="text-danger">{formik.errors.username}</Form.Text> : <Form.Text>{t('Имя пользователя')}</Form.Text>}
                      <Form.Control
                        id="username"
                        className="form-floating mb-4"
                        type="text"
                        placeholder="Введите имя пользователя"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column">
                      {formik.errors.password ? <Form.Text className="text-danger">{formik.errors.password}</Form.Text> : <Form.Text>{t('Пароль')}</Form.Text>}
                      <Form.Control
                        id="password"
                        className="form-floating mb-2"
                        type="password"
                        placeholder="Введите пароль"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column">
                      {formik.errors.confirmPassword ? <Form.Text className="text-danger">{formik.errors.confirmPassword}</Form.Text> : <Form.Text>{t('Повторите пароль')}</Form.Text>}
                      <Form.Control
                        id="confirmPassword"
                        className="form-floating mb-4"
                        type="password"
                        placeholder="Повторите пароль"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                      />
                    </Form.Group>
                    <Form.Group className="w-100 text-end">
                      <Button
                        className="btn btn-secondary p-2 "
                        type="submit"
                        disabled={!formik.isValid}
                        variant="primary"
                        onClick={formik.handleSubmit}
                      >
                        Отправить
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
