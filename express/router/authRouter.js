var express = require('express')
var router = express.Router()
var authController = require('../controllers/AuthController');
const session = require('express-session');
//passport
var passport = require('passport');

router.get("/login", authController.login);
/*
_Middleware validate user when post login
*/
router.post("/login", passport.authenticate('local', { //chọn phương thức check là local => npm install passport-local
  failureRedirect: '/auth/login',  //nếu check không đúng thì redirect về link này
  successRedirect: '/users'
}));

router.get("/loginGoogle", passport.authenticate('google', { scope: ['profile']}));
router.get("/google/redirect", passport.authenticate('google'), (req, res) => {
  res.send("username :" + req.user.name);
});
router.get('/loginGoogle/callback',
  passport.authenticate('google', { failureRedirect: 'auth/login'}),
  function(req, res) {
      console.log("eror google login");
    // Successful authentication, redirect home.
    res.redirect('auth/login');
  });

module.exports = router;