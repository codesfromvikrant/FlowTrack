const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');
const { authorizeToken } = require('../controllers/userController');

router.use(authorizeToken);
router.route('/')
  .get(workspaceController.getAllWorkspaces)
  .post(workspaceController.createWorkspace);

router.route('/:id')
  .delete(workspaceController.deleteWorkspace)
  .patch(workspaceController.updateWorkspace);

module.exports = router;