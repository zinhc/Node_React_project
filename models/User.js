const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //等同上面一行

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
