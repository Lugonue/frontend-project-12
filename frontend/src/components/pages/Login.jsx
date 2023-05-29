import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../styles/login.css';

import { setAuthorized, setCurrentUser } from '../../slices/stateSlice';
import Header from '../ui/Header';


const Login = ({ toast, t }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({ //valudation shema for formik
    name: yup.string().required('Name is required'),
    password: yup.string().required('Password is required').min(2),
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
        localStorage.setItem('username', response.data.username);

        //Подтверждаем аторизацию, перенаправляем пользователя на стартовую страницу с активными каналами и сообщениями
        dispatch(setAuthorized(true));
        toast.success(t('Вы успешно авторизовались'));
        dispatch(setCurrentUser({ name: response.data.username }));
        navigate('/');

      } catch (error) {
        if (error.response.status === 401) {
          toast.error(t('Неверный логин или пароль'));
        }
      }
    },
  })

  return (
    <div className="container h-100">
      <div className="row h-100 align-items-start">
        <Header />
        <div className="col-4 text-center">
          <h4 className="mb-5">{t('Нет аккаунта')}</h4>
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/signup')}
          >
            {t('Зарегистрироваться')}
          </Button>
        </div>
        <Form onSubmit={formik.handleSubmit} className='col-5 shadow-sm p-4'>
          <div className="text-center">
          <Form.Text className="fs-1 text-black">{t("логин форма")}</Form.Text>
          </div>
          <Form.Group className="mb-3" >
            <Form.Label className='text-muted'>{t('введите имя')}</Form.Label>
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
            <Form.Label className='text-muted'>{t('введите пароль')}</Form.Label>
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
          <Form.Group className="w-100 text-end">
            <Button variant="secondary" type="submit">
              {t('Войти')}
            </Button>
          </Form.Group>
        </Form>

      </div>

    </div>

  )
}

export default Login;