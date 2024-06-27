const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authorizeToken } = require('../controllers/user.controller');

router.use(authorizeToken);
router.route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router.route('/:id')
  .get(projectController.getProject)
  // .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;