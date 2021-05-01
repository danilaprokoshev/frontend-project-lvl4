import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <p style={{ textAlign: 'center' }}>
      <h2>404</h2>
      <h3>Такой страницы нет!</h3>
      <hr />
      <Link to="/">Перейти на главную </Link>
      {/* TODO: реализовать подстановку текста через i18n */}
      {/* TODO: реализовать подгрузку картинки об ошибке 404 */}
    </p>
  </div>
);

export default NotFoundPage;
