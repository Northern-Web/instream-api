const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

var UserSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true,
    trim:     true
  },
  email: {
    type:     String,
    required: true,
    trim:     true,
    unique:   true
  },
  company: {
    type: String,
    trim: true
  },
  password: {
    type:     String,
    required: true,
    trim:     true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  lastLogin: {
    type: Date
  },
  isActive: {
    type:     Boolean,
    required: true,
    default:  true
  }
});

UserSchema.plugin(timestamp);

var User = mongoose.model('User', UserSchema);
module.exports = { User };
