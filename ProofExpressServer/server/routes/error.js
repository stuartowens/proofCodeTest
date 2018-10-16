const express = require('express'),
const errorController = require('../controllers/error');

let router = express.Router();

router.get('/', errorController.index);

module.exports = router;
