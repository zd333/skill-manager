const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
