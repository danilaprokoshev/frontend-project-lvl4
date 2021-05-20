// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../hooks/authorization.jsx';
import routes from '../routes.js';

const SignupPage = () => {
  const [signupFailed, setSignupFailed] = useState(false);
  const auth = useAuth();
  const history = useHistory();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов'),
      password: yup.string()
        .required('Обязательное поле')
        .min(6, 'Не менее 6 символов'),
      confirmPassword: yup.string()
        .required('Обязательное поле')
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const res = await axios.post(routes.signupPath(), { username, password });
        auth.logIn(res.data);
        history.replace('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setSignupFailed(true);
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
              <Form.Label htmlFor="username">Имя пользователя</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="От 3 до 20 символов"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={signupFailed || (formik.touched.username && formik.errors.username)}
                required
                ref={inputRef}
              />
              {formik.touched.username && formik.errors.username ? (
                <Form.Control.Feedback
                  type="invalid"
                >
                  {formik.errors.username}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Не менее 6 символов"
                name="password"
                id="password"
                autoComplete="new-password"
                isInvalid={signupFailed || (formik.touched.password && formik.errors.password)}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <Form.Control.Feedback
                  type="invalid"
                >
                  {formik.errors.password}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder="Пароли должны совпадать"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                isInvalid={
                  signupFailed
                  || (formik.touched.confirmPassword && formik.errors.confirmPassword)
                }
                required
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <Form.Control.Feedback
                  type="invalid"
                >
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              ) : null}
              {signupFailed && (
                <Form.Control.Feedback
                  type="invalid"
                >
                  Такой пользователь уже существует
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button type="submit" className="w-100 mb-3" variant="outline-dark">Зарегистрироваться</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
