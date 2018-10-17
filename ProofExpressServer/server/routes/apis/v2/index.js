const express = require('express');
const allUsersController = require('../../../controllers/apis/allUsers');

let router = express.Router();

router.use('/allUsers', allUsersController);

module.exports = router;
