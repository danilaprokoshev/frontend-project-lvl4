// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/authorization.jsx';
import routes from '../routes.js';

// TODO: реализовать вставку текста интерфейса через i18n

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const history = useHistory();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        history.replace('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Введите ваш ник"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={authFailed}
                required
                ref={inputRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Пароль"
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={authFailed}
                required
              />
              <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="w-100 mb-3" variant="outline-dark">Войти</Button>
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">Нет аккаунта?</span>
              <a className="text-dark" href="/signup">Регистрация</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
