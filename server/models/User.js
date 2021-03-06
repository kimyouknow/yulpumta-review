import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  avatarUrl: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
});

userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        console.log(hash);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = async function (token) {
  let user = this;
  let found = null;
  try {
    await jwt.verify(token, 'secretToken', async function (err, decoded) {
      if (err) {
        err;
      }
      found = await user.findOne({ _id: decoded, token: token });
    });
    // throw new Error("eee");
  } catch (err) {
    // console.log(err);
    return err;
  }
  return found;
};

const User = mongoose.model('User', userSchema);
export default User;
