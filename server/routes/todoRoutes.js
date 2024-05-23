const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { authorizeToken } = require('../controllers/userController');

router.use(authorizeToken);
router.route('/')
  .get(todoController.getAllTodo)
  .post(todoController.createTodo);

router.route('/:id')
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;