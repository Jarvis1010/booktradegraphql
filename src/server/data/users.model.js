import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  location: { type: String },
  email: { type: String },
  password: { type: String, required: true },
});

mongoose.model('User', userSchema, 'btUsers');
