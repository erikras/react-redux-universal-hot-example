import bcrypt from 'bcrypt';
import { createValidatorPromise as createValidator, required, email as isEmail } from '../utils/validation';

const SALT_WORK_FACTOR = 10;

export default function User(bookshelf) {
  return bookshelf.Model.extend(
    {
      tableName: 'user',
      hasTimestamps: true,
      hidden: 'password',

      initialize() {
        this.on('creating', this.hashPassword, this);
        this.on('saving', this.validate, this);
      },

      validate(model) {
        return createValidator({
          email: [required, isEmail],
          password: [required]
        })(model.attributes);
      },

      hashPassword(model) {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return reject(err);

            bcrypt.hash(model.get('password') || '', salt, (errHash, hash) => {
              if (errHash) return reject(errHash);
              model.set('password', hash);
              resolve(model);
            });
          });
        });
      },

      comparePassword(candidatePassword) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(candidatePassword, this.get('password'), (err, isMatch) => {
            if (err) return reject(err);
            resolve(isMatch);
          });
        });
      },
    },
    {
      byEmail(email) {
        return this.forge().query({ where: { email } }).fetch();
      }
    }
  );
};
