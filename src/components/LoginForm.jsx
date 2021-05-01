import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const { name, onChange, value } = field;
  // TODO: добавить стили bootstrap для текстовых полей
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" name={name} onChange={onChange} value={value} type={props.type} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const LoginForm = () => (
  <>
    <Formik
      initialValues={{
        nickName: '',
        password: '',
      }}
      // TODO: реализовать вставку текста интерфейса через i18n
      validationSchema={yup.object({
        nickName: yup.string()
          .min(3, 'От 3 до 20 символов')
          .max(20, 'От 3 до 20 символов')
          .required(),
        password: yup.string()
          .min(6, 'Не менее 6 символов')
          .required(),
      })}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <MyTextInput
          label="Ваш ник"
          name="nickName"
          type="text"
        />
        <MyTextInput
          label="Пароль"
          name="password"
          type="text"
        />
        <button className="btn btn-primary" type="submit">Войти</button>
      </Form>
    </Formik>
  </>
);

export default LoginForm;
