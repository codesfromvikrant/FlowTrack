const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/signout', userController.signout);
router.get('/unique_username/:searchterm', userController.uniqueUsername);

module.exports = router;