const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/register' ,adminController.getAdminRegistration);
router.post('/register' ,adminController.postAdminRegistration);
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.post('/logout',adminController.postLogout);
router.get('/dashboard', adminController.getDashboard);
router.post('/delete-user/:id', adminController.deleteUser);


module.exports = router;