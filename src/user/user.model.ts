import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      avatar: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true },
);

export interface UserProfile {
  avatar?: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile?: UserProfile;
}
