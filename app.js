const config = require('config');
const express = require('express');
const router = require('./src/router');
const { errorHandler } = require('./src/middleware/error');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
const path = require('path');
// require('./src/scripts/index');
// require('./src/mq')

const { connect } = require('./src/service/lib/db');

//port
const PORT = config.get('app.port');
const app = express();

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    lng: 'en',
    ns: ['auth',"user",'test'],
    defaultNS: ['auth','user','test'],
    backend: {
      loadPath: path.join(__dirname, `/src/locales/{{lng}}/{{ns}}.json`),
      addPath: path.join(__dirname, `/src/locales/{{lng}}/{{ns}}.json`)
    },
    detection: {
      order: ['header', 'querystring', 'cookie'],
      lookupQuerystring: 'lang',
      lookupHeader:'lang',
      caches: false
    },
    fallbackLng: 'en',
    preload: ['en', 'id']
  });

// Initialize the i18next middleware
app.use(i18nextMiddleware.handle(i18next));

// Middlewares
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

// Example route to test translations
app.get('/test', (req, res) => {
  const message = req.t('companyName'); // Assuming you have 'welcome_message' in your translation files
  console.log("message", message);
  res.status(200).send({ status: true, message });
});

// Connecting to the database and starting the server
connect()
  .then(() => {
    console.log("connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("failed to connect with db");
    console.log("Error", err);
  });
