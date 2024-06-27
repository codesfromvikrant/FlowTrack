const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags.controller');
const { authorizeToken } = require('../controllers/user.controller');

router.use(authorizeToken);
router.route('/')
  .get(tagsController.getAllTags)
  .post(tagsController.createTag);

router.delete('/:id', tagsController.deleteTag);

module.exports = router;