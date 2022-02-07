import { Schema, model } from 'mongoose';

export interface UserModel {
  name: String,
  bio: String,
  githubID: Number,
  imageURL: String,
  publicProfile: Boolean,
}

const userSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  githubID: {
    type: Number,
    require: true,
  },
  imageURL: {
    type: String,
  },
  publicProfile: {
    type: Boolean,
    require: true,
    default: false,
  },
});

const User = model<UserModel>('User', userSchema);
export default User;
