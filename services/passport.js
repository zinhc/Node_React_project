const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);//null表示no error ,
  // user.id並不表示是profile.id 是表示mongoDB替每筆資料產生的unique id (_id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
    })
});


//當登入google的account時，頁面會轉到/auth/google/callback
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log('access token', accessToken);
      //console.log('refresh token', refreshToken);
      //console.log('profile', profile);

      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if(existingUser) {
            // we already have a record with the giving profile ID
            done(null, existingUser);
          } else {
            // we don't have a user record with this ID, make a new record!

            //將google帳號中profile的id存入DB
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        });


    }
  )
);
