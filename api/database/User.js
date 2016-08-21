import { createValidatorPromise as createValidator, required, email as isEmail } from '../utils/validation';

export default function User(bookshelf) {
  return bookshelf.Model.extend(
    {
      tableName: 'user',
      hasTimestamps: true,
      hidden: 'password',

      initialize() {
        this.on('saving', this.validate, this);
      },

      validate(model) {
        return createValidator({
          email: [required, isEmail],
          password: [required]
        })(model.attributes);
      }
    },
    {
      byEmail(email) {
        return this.forge().query({ where: { email } }).fetch();
      }
    }
  );
}
