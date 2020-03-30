var passport = require('passport');

var keys = require('./keys');
var usersColection = require('../models/UsersModel');

// mã hóa thông tin user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//hàm giải mã định dạng
passport.deserializeUser((id, done) => {
  usersColection.findOne({id : id}).then((user) => {
    done(null, user);
  }
)});

// auth login google
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// setting google clientid and secret
passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    // sau khi dang nhap thanh cong thi den trang user
    callbackURL: "http://localhost:3000/auth/google/redirect"
},function(accessToken, refreshToken, profile, done) {
  // find user if exist in database => logi ok, else insert user
  usersColection.findOne({googleId : profile.id}).then((currentUser) => {
    if (currentUser) {
      console.log(null, currentUser);
      done(null, currentUser);
    } else {
      new usersColection({
        name : profile.displayName,
        googleId : profile.id
      }).save().then((newUser) => {
        console.log(null, newUser);
        done(null, newUser);
      })
    }
  })}
));

//define use  passport local
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(
  (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done
      if(username == 'thevu1991@gmail.com') { //kiểm tra giá trị trường có name là username
          if (password == '123456') { // kiểm tra giá trị trường có name là password
            usersColection.findOne({username : username}).then((user) => {
              done(null, user);
            })
          } else {
              return done(null, false); // chứng thực lỗi
          }
      } else {
          return done(null, false); //chứng thực lỗi
      }
  }
));