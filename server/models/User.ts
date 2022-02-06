import { Schema, model } from 'mongoose';

interface UserModel {
  name: String,
  bio: String,
  githubID: Number
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
  }
});

const User = model<UserModel>('User', userSchema);
export default User;
