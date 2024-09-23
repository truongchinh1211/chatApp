var express = require('express');
var router = express.Router()
const {AuthController} = require('../Controller/index')
const TokenHandler = require('../handler/TokenHandler')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.get('/user-info',TokenHandler.verifyToken,AuthController.getUserInfo)
router.post('/user-info',TokenHandler.verifyToken,AuthController.updateUserInfo)
router.post('/set-avatar',TokenHandler.verifyToken, AuthController.setAvatar)
module.exports = router;
