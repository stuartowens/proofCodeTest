const express = require('express');
const userService = require('../../../services/users');

let router = express.Router();

router.get('/', userService.groupUsers);
router.get('/:id', userService.getUserWithId);
router.post('/createUsers', userService.createUsers);
router.post('/createCampaigns', userService.createCampaigns);

module.exports = router;
