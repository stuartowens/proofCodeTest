const express = require('express');
const homeController = require('../controllers/home');

let router = express.Router();

router.get('/', homeController.index);
router.get('/info', homeController.info);

module.exports = router;
