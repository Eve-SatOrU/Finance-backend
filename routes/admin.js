
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/registerExpert', adminController.getAdminRegisterExpert);
router.post('/registerExpert' , adminController.postAdminRegisterExpert);
// get all expert
router.get('/experts', adminController.getAllExperts);
// expert profile
router.get('/expert-profile/:id', adminController.getExpertProfile);

module.exports = router;