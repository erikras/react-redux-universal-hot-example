import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend'
import { LanguageDetector } from 'i18next-express-middleware'


i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    whitelist: ['en', 'ko-KR'],
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    backend: {
      // path where resources get loaded from
      loadPath: 'locales/{{lng}}/{{ns}}.json',

      // path to post missing resources
      addPath: 'locales/{{lng}}/{{ns}}.missing.json',

      // jsonIndent to use when storing json files
      jsonIndent: 2
    }
  });


export default i18n;
