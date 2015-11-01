import request from 'superagent';
import urlHelper from '../../helpers/urlHelper';

export default function load(req) {
  console.log('API: req to load the landmark', req.params);
  console.log("let's get: ",urlHelper.landmarkEndpoint(2));
  return new Promise((resolve, reject) => {
    request
      .get(urlHelper.landmarkEndpoint(2))
      .end((err, res) => {
        if (res.ok) {
          resolve(res.body);
        } else {
          reject(res.toError());
        }
      });
  });
}
