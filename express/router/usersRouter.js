var express = require('express')
var router = express.Router()
var db = require('../config/db');
var controllerUser = require('../controllers/UserController');

router.get("/add", controllerUser.add);
router.get("/", controllerUser.list);
router.get("/detail/:id", controllerUser.detail);
/*
_Middleware validate user when post add
_Phương thức dạng lọc trước khi vào controller hay xử lý tiếp theo
_khi ok sẽ dùng next để xử lý tiếp theo
_có thể dùng nhiều midle ware cho 1 cotroller
*/
router.post("/add", controllerUser.validateAddUser, controllerUser.postAdd);


module.exports = router;