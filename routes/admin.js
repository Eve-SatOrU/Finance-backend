
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/registerExpert', adminController.getAdminRegisterExpert);
router.post('/registerExpert' , adminController.postAdminRegisterExpert);


module.exports = router;