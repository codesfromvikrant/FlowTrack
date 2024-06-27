const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspace.controller');
const { authorizeToken } = require('../controllers/user.controller');

router.use(authorizeToken);
router.route('/')
  .get(workspaceController.getAllWorkspaces)
  .post(workspaceController.createWorkspace);

router.route('/:id')
  .delete(workspaceController.deleteWorkspace)
  .patch(workspaceController.updateWorkspace);

module.exports = router;