import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Invalid email address'],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '/noavatar.png',
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
