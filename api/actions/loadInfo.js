export default function loadInfo( req ) {
  return Promise.resolve( {
    message: 'This came from the api server',
    time: Date.now()
  } );
}
