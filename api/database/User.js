import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: { type: String, lowercase: true, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

UserSchema.pre('save', next => {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (errSalt, hash) => {
      if (errSalt) return next(errSalt);

      user.password = hash;
      return next();
    });
  });
});

// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/* eslint-disable no-underscore-dangle */
UserSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  minimize: false,
  transform: (doc, ret) => {
    const user = ret;
    user.id = user._id;
    delete user.password;
    delete user.token;
    delete user._id;
    delete user.__v;
    return user;
  }
};
/* eslint-enable no-underscore-dangle */

const User = mongoose.model('User', UserSchema);

export default User;
