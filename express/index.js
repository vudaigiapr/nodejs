// import express
const express = require("express");
//và khai báo sử dụng session
const session = require('express-session');
//define app use express
const app = express();

//import bodyParser get body get requried
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded(key:value, value string or array)
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//import cookie
const cookieParser = require('cookie-parser')
// cretae 1 chuỗi security for sign cookoie
app.use(cookieParser('213123123qewqeqeqsafsdfs'))

//define use  passport
const passport = require("passport")
// seting passport
const passportSetup = require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

//get usersRouter process route for user
const usersRouter = require('./router/usersRouter');

//get auth Router process route for login
const authRouter = require('./router/authRouter');

//mongoosee
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UserManager', () => {
  console.log("ket noi mongodb ok!")
});

//set view engine use pug engine
app.set("view engine", "pug");

// config public statuc files
// line default -> css,img,js
app.use(express.static('public'))

//call router user with user/...
app.use('/users', usersRouter)

//call router user with user/...
app.use('/auth', authRouter)

//declare path / process
app.get("/", (req, res) => res.render("index", { name: "thevu" }));

app.listen(3000, () => {
  console.log("Start app port 3000");
});

app.use(session({
    secret: 'secretsession',
    cookie: {
        maxAge: 1000 * 50 * 5 //đơn vị là milisecond
    }
}));
