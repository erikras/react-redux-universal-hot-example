import mongoose from 'mongoose';

export {User} from '../database';

export function initialize(config) {
  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, err => {
    if (err) return console.error(err);
    console.info('==> 🌎  Successfully connected to MongoDB');
  });
}
