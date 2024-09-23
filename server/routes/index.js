const router = require('express').Router();
router.use('/auth', require('./AuthRoute'));
router.use('/user',require('./UserRoute'))

module.exports= router;

