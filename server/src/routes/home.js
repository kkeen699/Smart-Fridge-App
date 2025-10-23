const express = require('express');
const router = express.Router();
const { getHome } = require('../controllers/homeController');

// GET /api/home/
router.get('/', getHome);

module.exports = router;
