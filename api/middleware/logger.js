import PrettyError from 'pretty-error';

const pretty = new PrettyError();

export default function logger(app) {
  // Add a logger to our app object for convenience
  app.logger = pretty;

  return (error, req, res, next) => {
    if (error && error.code !== 404) {
      console.error('API ERROR:', pretty.render(error));
    }

    next(error);
  };
}
