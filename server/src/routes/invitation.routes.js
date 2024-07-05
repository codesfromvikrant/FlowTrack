const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitation.controller');
const { authorizeToken } = require('../controllers/user.controller');

router.use(authorizeToken);
router.route('/')
  .get(invitationController.acceptInvitation)
  .post(invitationController.sendInvitation);

module.exports = router;