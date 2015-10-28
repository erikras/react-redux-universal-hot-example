import request from 'superagent';
import urlHelper from '../../helpers/urlHelper';

export default function load(req) {
  console.log('API: req to load the landmark');
  console.log("let's get: ",urlHelper.landmarkEndpoint(1));
  return new Promise((resolve, reject) => {
    request
      .get(urlHelper.landmarkEndpoint(1))
      .end((err, res) => {
        if (res.ok) {
          resolve(res.body);
        } else {
          reject(res.toError());
        }
      });
  });
}
