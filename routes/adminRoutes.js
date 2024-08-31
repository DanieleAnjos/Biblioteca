// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rotas de admin
router.get('/register', adminController.registerPage);
router.post('/register', adminController.registerAdmin);
router.get('/login', adminController.loginPage);
router.post('/login', adminController.loginAdmin);

module.exports = router;
