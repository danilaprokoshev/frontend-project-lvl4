// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/authorization.jsx';
import routes from '../routes.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const [signupFailed, setSignupFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
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
        .required(t('form_errors.required'))
        .min(3, t('form_errors.required_length'))
        .max(20, t('form_errors.required_length')),
      password: yup.string()
        .required(t('form_errors.required'))
        .min(6, t('form_errors.min_length')),
      confirmPassword: yup.string()
        .required(t('form_errors.required'))
        .oneOf([yup.ref('password'), null], t('form_errors.password_equals')),
    }),
    onSubmit: async ({ username, password }) => {
      setSubmitting(true);
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
      setSubmitting(false);
    },
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label htmlFor="username">{t('signup.username_label')}</Form.Label>
              <Form.Control
                type="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder={t('signup.username_placeholder')}
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
              <Form.Label htmlFor="password">{t('signup.password_label')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder={t('signup.password_placeholder')}
                name="password"
                id="new-password"
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
              <Form.Label htmlFor="confirmPassword">{t('signup.confirm_password_label')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder={t('signup.confirm_password_placeholder')}
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
                  {t('signup.invalid_user')}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button type="submit" className="w-100 mb-3" disabled={isSubmitting} variant="outline-dark">{t('signup.sign_up')}</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
