// @ts-check

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../locales/ru.js';

const defaultLanguage = 'ru';

i18n
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    debug: true,
    resources: {
      ru,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
