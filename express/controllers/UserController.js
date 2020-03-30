//connect db
var db = require('../config/db');
// get data from table user
var listUsers = db.get('users').value();

/*
create controller with module.export get list user
*/
module.exports.list = (req, res) => {
    res.render("users/UserList", {listUsers})
}

/*
create controller with module.export add user
*/
module.exports.add = (req, res) => {
    res.render("users/Add", { name: "thevu" })
}

/*
create controller with post add user
*/
module.exports.postAdd = (req, res) => {
    var dataInput = req.body;
    db.get('users')
    .push({ id : listUsers.length + 1, name : dataInput.name })
    .write();
    res.redirect('/users');
}

/*
create controller with post detail user
*/
module.exports.detail = (req, res) => {
    var id = parseInt(req.params.id);
    var user = db.get('users').find({ id: id }).value();
    res.render("users/detail", { user: user });
}

/*
create controller with post detail user
*/
module.exports.validateAddUser = (req, res, next) => {
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is required')
    }
    if (errors.length > 0) {
        res.render("users/Add", { errors: errors, value: req.body });
        return;
    }
    next()
}