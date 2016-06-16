import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: {type: String, lowercase: true, required: true, index: {unique: true}},
  password: {type: String, required: true}
});

UserSchema.pre('save', next => {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (errSalt, hash) => {
      if (errSalt) return next(errSalt);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) { // eslint-disable-next-line func-names
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  minimize: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.password;
    delete ret.token;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
