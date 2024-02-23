
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const aiChat= require('../controllers/aiChat');
// i think i will put all routes here anyway lesss gooo


// user routes 
router.get('/register', userController.getRegister);
router.post('/register' , userController.postRegister);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.post('/logout', userController.postLogout);
// ask
router.post('/ask', aiChat.Askai);

module.exports = router;