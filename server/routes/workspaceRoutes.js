const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');

router.route('/')
  .get(workspaceController.getAllWorkspaces)
  .post(workspaceController.createWorkspace);

router.route('/:id')
  .delete(workspaceController.deleteWorkspace)
  .patch(workspaceController.updateWorkspace);

module.exports = router;