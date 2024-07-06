const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitation.controller');
const { authorizeToken } = require('../controllers/user.controller');

router.use(authorizeToken);
router.get('/accept', invitationController.acceptInvitation)
router.post('/send', invitationController.sendInvitation)

module.exports = router;