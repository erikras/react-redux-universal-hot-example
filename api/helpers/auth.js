import passport from 'passport';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { User } from './database';

const { ExtractJwt, Strategy } = passportJwt;

export function initialize( secret ) {

  let opts = {
    jwtFromRequest: tokenExtractor,
    secretOrKey: secret
  };

  function tokenExtractor( req ) {
    const sessionToken = req.session && req.session.user && req.session.user.token
    return ExtractJwt.fromAuthHeader()( req ) || sessionToken;
  }

  passport.use( new Strategy( opts, ( jwt_payload, done ) => {
    User.findOne( { id: jwt_payload.sub }, function( err, user ) {
      if ( err ) {
        return done( err, false );
      }
      if ( user ) {
        done( null, user );
      } else {
        done( null, false );
      }
    } );
  } ) );

  passport.serializeUser( ( user, done ) => {
    done( null, user.id );
  } );

  passport.deserializeUser( ( id, done ) => {
    User.findById( id, ( err, user ) => {
      done( err, user );
    } );
  } );
}

export function requireLogin( req, res ) {
  return new Promise( ( resolve, reject ) => {
    if ( req.session && req.session.user ) resolve( req.session.user );

    passport.authenticate( 'jwt', function( err, user, info ) {
      if ( err ) reject( err );
      if ( !user ) reject( 'Not authorized' );
      req.login( user, err => {
        if ( err ) reject( err );
        resolve();
      } );
    } )( req );
  } );
}