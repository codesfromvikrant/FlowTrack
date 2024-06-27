const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const { authorizeToken } = require('../controllers/user.controller');

router.use(authorizeToken);
router.route('/')
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask);

router.route('/:id')
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);

router.route('/tasksgroup')
  .get(tasksController.getAllTasksGroup)
  .post(tasksController.createTasksGroup);

module.exports = router;