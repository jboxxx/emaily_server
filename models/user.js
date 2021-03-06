const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// note we are loading a schema into mongoose, and this file is only required once
mongoose.model('users', userSchema);
