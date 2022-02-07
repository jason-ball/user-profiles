import { Schema, model } from 'mongoose';

interface UserModel {
  name: String,
  bio: String,
  githubID: Number,
  imageURL: String,
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
    require: true
  },
  imageURL: {
    type: String
  }
});

const User = model<UserModel>('User', userSchema);
export default User;
