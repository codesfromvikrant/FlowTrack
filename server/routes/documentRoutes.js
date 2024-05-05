const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { authorizeToken } = require('../controllers/userController');

router.use(authorizeToken);
router.route('/')
  .get(documentController.getAllDocuments)
  .post(documentController.createDocument);

router.route('/:id')
  .get(documentController.getDocument)
  .patch(documentController.updateDocument)
  .delete(documentController.deleteDocument);

router.route('/tags/:id').post(documentController.updateDocumentTags);

module.exports = router;