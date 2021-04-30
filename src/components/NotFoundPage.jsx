import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/images/404.png';

const myPageNotFound = new Image();
myPageNotFound.src = PageNotFound;

const NotFoundPage = () => {
  return (
    <div>
      <img src={myPageNotFound} alt="page not found" />
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
