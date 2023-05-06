import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../styles/login.css';


import { setAuthorized, setCurrentUser } from '../slices/stateSlice';


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({ //valudation shema for formik
    name: yup.string().required('Name is required'),
    password: yup.string().required('Password is required').min(2),
  });

  const [responsState, setResponsState] = useState({
    status: false,
    message: '',
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const username = values.name;
        const password = values.password;
        const response = await axios.post('/api/v1/login', { username, password });

        //сохраняем токен полученный от сервера в локальное хранилище 
        localStorage.setItem('token', response.data.token);

        setResponsState({
          status: false,
          message: '',
        })

        //Подтверждаем аторизацию, перенаправляем пользователя на стартовую страницу с активными каналами и сообщениями
        dispatch(setAuthorized());
        dispatch(setCurrentUser({ name: response.data.username }));
        navigate('/');

      } catch (error) {
        setResponsState({
          status: true,
          message: error.message,
        })
      }
    },
  })

  return (
    <div className="container-md login-conteiner">
      <Form onSubmit={formik.handleSubmit} className='w-50'>
        <Form.Group className="mb-3" >
          <Form.Label>Input your name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="error text-danger">{formik.errors.name}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="error text-danger">{formik.errors.password}</div>
          ) : null}
        </Form.Group>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
        {responsState && <div className='alert text-danger'>{responsState.message}</div>}
      </Form>
    </div>

  )
}

export default Login;