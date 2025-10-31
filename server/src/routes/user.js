const express = require('express');
const router = express.Router();
const verifyIdToken = require('../middleware/authMiddleware');
const { createUser } = require('../controllers/userController');

// POST /api/user/create-user
router.post('/create-user', verifyIdToken, createUser);

module.exports = router;
