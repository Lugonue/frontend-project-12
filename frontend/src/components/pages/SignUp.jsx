import { useFormik } from "formik";
import { Form } from "react-bootstrap";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: () => {
      return true;
    },
  });

  return (
    <div className="container-fluid bg-light h-100">
      <div className="row col-12 col-md-8 col-xxl-6 h-100 align-items-center justify-content-center">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div className="col-6">
              <h1>Регистрация</h1>
            </div>
            <div className="col-6">
              <div className="">
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Text>Регистрация</Form.Text>
                  <Form.Control
                    id="username"
                    className="form-floating mb-4"
                    type="text"
                    placeholder="Введите имя пользователя"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Form.Control
                    id="password"
                    className="form-floating mb-4"
                    type="password"
                    placeholder="Введите пароль"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control
                    id="confirmPassword"
                    className="form-floating mb-4"
                    type="password"
                    placeholder="Повторите пароль"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <Form.Control
                    className="form-floating mb-4"
                    type="submit"
                    value="Зарегистрироваться"
                    variant="primary"
                    onClick={formik.handleSubmit}
                  />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
