// @ts-check

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p style={{ textAlign: 'center' }}>
        <h2>{t('not_found.error_code')}</h2>
        <h3>{t('not_found.not_found_page')}</h3>
        <hr />
        <Link className="text-dark" to="/">{t('not_found.link_to_main')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
