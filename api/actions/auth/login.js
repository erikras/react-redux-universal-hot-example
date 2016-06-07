import config from '../../../src/config';
import jwt from 'jsonwebtoken';
import { User } from '../../database';

export default function login( req ) {
  return new Promise( ( resolve, reject ) => {
    User.findOne( {
      email: req.body.email
    }, ( err, user ) => {
      if ( err ) reject( err );
      if ( !user ) {
        reject( 'Authentication failed. User not found.' );
      } else {
        user.comparePassword( req.body.password, ( errMatch, isMatch ) => {
          if ( isMatch && !errMatch ) {
            const token = jwt.sign( user, config.secret, {
              expiresIn: 60000
            } );
            const userLogged = Object.assign( user.toJSON(), { token: 'JWT ' + token } );
            req.session.user = userLogged;
            resolve( userLogged );
          } else {
            reject( 'Authentication failed. Passwords did not match.' );
          }
        } );
      }
    } );
  } );
}
