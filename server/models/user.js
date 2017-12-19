import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import slug from 'limax';
import Promise from 'promise';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: 'String', required: true, index: { unique: true } },
  slug: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  role: { type: 'String', required: true, enum: ['user', 'instructor', 'admin'], default: 'user' },
  password: { type: 'String', required: true },
  membership: [],
  rent: []
}, {
  timestamps: true
});

/**
 * Generate password hash
 * @param password
 * @returns {*}
 */
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Check if password is valid
 * @param password
 * @returns {*}
 */
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Check if email is already use
 * @param email
 * @returns {Promise}
 */
userSchema.statics.emailExist = function (email) {
  return new Promise((resolve, reject) => {
    this.findOne({ email }, (err, user) => {
      if (err) throw err;
      if (user) {
        resolve(user);
      } else {
        reject(`${email} don't exists`);
      }
    });
  });
};

userSchema.statics.passwordMatch = function (slug, password) { // eslint-disable-line no-shadow
  return new Promise((resolve, reject) => {
    this.findOne({ slug }, (err, user) => {
      if (err) {
        throw err;
      }
      if (user.validPassword(password)) {
        resolve(user);
      } else {
        reject('Incorrect password');
      }
    });
  });
};

userSchema.pre('validate', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  }

  if (this.isModified('lastName') || this.isModified('firstName')) {
    this.slug = slug(`${this.firstName.toLowerCase()} ${this.lastName.toLowerCase()}`);
  }

  return next();
});

export default mongoose.model('User', userSchema);
