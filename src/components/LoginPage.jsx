// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/authorization.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
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
      setSubmitting(true);
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        history.replace('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setSubmitting(false);
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
      setSubmitting(true);
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label htmlFor="username">{t('login.nick_label')}</Form.Label>
              <Form.Control
                type="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder={t('login.nick_placeholder')}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={authFailed}
                required
                ref={inputRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="current-password">{t('login.password_nick')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={t('login.password_placeholder')}
                name="password"
                id="current-password"
                autoComplete="current-password"
                isInvalid={authFailed}
                required
              />
              {authFailed && <Form.Text className="text-danger">{t('login.invalid_user')}</Form.Text>}
            </Form.Group>
            <Button type="submit" className="w-100 mb-3" disabled={isSubmitting} variant="outline-dark">{t('login.enter')}</Button>
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">{t('login.account_exists')}</span>
              <Link className="text-dark" to="/signup">{t('login.ref_to_registration')}</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
