import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserFields, UserMethods, UserModel, UserVirtuals } from '../types';
import { randomUUID } from 'node:crypto';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields, UserModel, UserMethods, {}, UserVirtuals>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserFields>).isModified('username')) {
          return true;
        }

        const user = await User.findOne({username: value});
        return !user;
      },
      message: 'This user is already registered!',
    }
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
},
  {
    virtuals: {
      confirmPassword: {
        get() {
          return this.__confirmPassword;
        },
        set(confirmPassword: string) {
          this.__confirmPassword = confirmPassword;
        }
      }
    }
  }
);

UserSchema.path('password').validate(function(v) {
  if (!this.isModified('password')) {
    return;
  }

  if (v !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords do not match!');
    this.invalidate('password', 'Passwords do not match!');
  }
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
  this.token = randomUUID();
};

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);

export default User;