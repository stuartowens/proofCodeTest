const express = require('express');
const userService = require('../../../services/users');

let router = express.Router();

router.get('/', userService.getUsers);
router.get('/:id', userService.getUserWithId);

module.exports = router;
