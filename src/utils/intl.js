import reactCookie from 'react-cookie';
import { locale as defaultLocale, locales } from 'config';

const maxAge = 24 * 60 * 60 * 1000 * 7;
const getDefaultLocale = () => {
  const localeFromCookie = reactCookie.load('locale');
  return locales.indexOf(localeFromCookie) !== -1 ? localeFromCookie : defaultLocale;
};
const IntlUtils = {

  intlDataHash: {
    en: {
      file: 'en',
      locale: 'en'
    },
    fr: {
      file: 'fr',
      locale: 'fr'
    },
  },
  initializer(params, history, location, loader) {

    let currentLocale = getDefaultLocale();

    if (params.locale && locales.indexOf(params.locale) !== -1) {
      currentLocale = params.locale;
    } else {
      setTimeout(() => {
        history.replaceState(null, `/${currentLocale}${location.pathname}`);
      });
    }

    if (loader) {
      loader(currentLocale, locales);
    }
  },
  getCurrentLocale(localeFromParams) {

    let currentLocale = getDefaultLocale();

    // 設定語系，並取得語系資料
    if (locales.indexOf(localeFromParams) !== -1) {
      reactCookie.save('locale', localeFromParams, {
        path: '/',
        maxAge: maxAge
      });
      currentLocale = localeFromParams;
    }
    return currentLocale;
  }
};
export default IntlUtils;
