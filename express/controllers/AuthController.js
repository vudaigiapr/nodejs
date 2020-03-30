//connect db
var db = require('../config/db');
/*
create controller with module.export login
*/
module.exports.login = (req, res) => {
    res.render("auths/login")
}

/*
create controller with module.export post login
*/
module.exports.postLogin = (req, res) => {
    var errors = [];
    var dataInput = req.body;
    var user = db.get("users").find({email : dataInput.email}).value();
    if (user) {
        res.cookie("user_id", user.id, { signed: true });
        res.redirect('/users');
        return;
    } else {
        errors.push("Username or password is wrong!")
    }
    res.render("auths/login", {errors : errors, values : dataInput})
}

/*
create controller with module.export validate login
*/
module.exports.validateLogin = (req, res, next) => {
    var errors = [];
    if (!req.body.email) {
        errors.push("Email not empty")
    }
    if (!req.body.password) {
        errors.push("password not empty")
    }
    if (errors.length > 0) {
        res.render("auths/login", {errors : errors, values : req.body})
        return;
    }
    next()
}

/* create controller with module.export login google
*/
module.exports.loginGoogle = (req, res) => {
    res.send("auths/loginGoogle")
}