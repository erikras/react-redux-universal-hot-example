import error from 'feathers-errors/handler';
import notFound from './not-found-handler';
import logger from './logger';

export default function middleware() {
  const app = this;

  app.use(notFound());
  app.use(logger(app));
  app.use(error({
    json: function(error, req, res, next) {
      if (error.message == 'Validation failed') res.json(error.data);
    }
  }));
};
