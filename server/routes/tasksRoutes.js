const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { authorizeToken } = require('../controllers/userController');

router.use(authorizeToken);
router.route('/')
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask);

router.route('/tasksgroup')
  .get(tasksController.getAllTasksGroup)
  .post(tasksController.createTasksGroup);

module.exports = router;