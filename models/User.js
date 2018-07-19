const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //等同上面一行

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
