import errorHandler from 'feathers-errors/handler';
import notFound from './notFound';
import logger from './logger';

export default function middleware() {
  const app = this;

  app.use(notFound());
  app.use(logger(app));
  app.use(errorHandler({
    json: (error, req, res) => {
      res.json(error);
    },
    html: (error, req, res) => {
      res.json(error);
      // render your error view with the error object
      // res.render('error', error); // set view engine of express if you want to use res.render
    }
  }));
}
