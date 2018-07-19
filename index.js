const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
//const passportCofig = require('./services/passport'); 等同下方
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    //session可以存在多久 要轉換成millisecond 在此是30天
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] //要加密的key
  })
);
app.use(passport.initialize());
app.use(passport.session());

//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);

//等同上方2行寫法 require('./routes/authRoutes')回傳一個function
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
