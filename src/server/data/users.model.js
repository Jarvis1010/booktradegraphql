import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  location: { type: String },
  email: { type: String },
  password: { type: String, required: true },
});

export default mongoose.model('User', userSchema, 'btUsers');
