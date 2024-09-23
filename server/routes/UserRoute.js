var express = require('express');
var router = express.Router()
const {UserController} = require('../Controller/index')
const TokenHandler = require('../handler/TokenHandler')

router.get('/user-info',TokenHandler.verifyToken,UserController.getUserInfo)
router.post('/user-info',TokenHandler.verifyToken,UserController.updateUserInfo)
router.post('/set-avatar',TokenHandler.verifyToken, UserController.setAvatar)
router.get('/search-users/:key',TokenHandler.verifyToken, UserController.searchUser)

module.exports = router