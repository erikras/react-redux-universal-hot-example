import { User } from '../../helpers/database';

export default function register( req ) {
  return new Promise( ( resolve, reject ) => {
    if ( !req.body.email || !req.body.password ) {
      return reject( 'Please enter email and password.' );
    }


    const newUser = new User( {
      email: req.body.email,
      password: req.body.password
    } );

    newUser.save( err => {
      if ( err ) {
        console.log( err );
        return reject( 'Error in saving user.' );
      }
      resolve( { user: newUser } );
    } );
  } );
}
