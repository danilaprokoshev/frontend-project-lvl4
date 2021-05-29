// @ts-check

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../locales/ru.js';

export default async () => {
  const i18nInstance = i18n.createInstance();
  const defaultLanguage = 'ru';

  await i18nInstance
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

  return i18nInstance;
};
