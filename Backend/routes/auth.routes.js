const express = require('express');
const { register, login, logout, profile } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const router = express.Router();



router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile',authMiddleware,profile) 






module.exports = router;