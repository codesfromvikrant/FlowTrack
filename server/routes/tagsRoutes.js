const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController');

router.route('/')
  .get(tagsController.getAllTags)
  .post(tagsController.createTag);

router.delete('/:id', tagsController.deleteTag);

module.exports = router;