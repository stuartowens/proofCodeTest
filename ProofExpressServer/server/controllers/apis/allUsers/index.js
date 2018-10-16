const express = require('express');
const userController = require('../users');

let router = express.Router();

router.use('/users', userController);

module.exports = router;
