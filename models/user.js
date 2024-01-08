// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  age: Number,
  location: String,
  interests: [String],
  income: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
