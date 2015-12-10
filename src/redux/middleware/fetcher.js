import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    return 'http://' + __CONFIG__.apiHost + ':' + __CONFIG__.apiPort + adjustedPath;
  }
  // Prepend api prefix to relative URL, to proxy to API server.
  return '/' + __CONFIG__.apiPrefix + adjustedPath;
}

class ApiFetcher {
  constructor(cookie) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && cookie) {
          request.set('cookie', cookie);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, res) => {
          if (err) {
            reject(res && res.body ? res.body : err);
          } else {
            resolve(res);
          }
        });

      }));
  }
}

export default function fetcherMiddleware(req) {
  let cookie;
  // req is only passed from serverside
  if (req) {
    cookie = req.get('cookie');
  }
  const fetcher = new ApiFetcher(cookie);
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(fetcher).then(
        (response) => next({...rest, 'result': response.body, 'response': response, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('FETCHdING MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}
