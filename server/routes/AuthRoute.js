var express = require('express');
var router = express.Router()
const {AuthController} = require('../Controller/index')
const TokenHandler = require('../handler/TokenHandler')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)

module.exports = router;
