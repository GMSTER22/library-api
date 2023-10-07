const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authenticate');
const { bookValidationRules, validate } = require('../helpers/validate');
const {
  getAll,
  getSingle,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/books.controllers');

router.get('/', getAll);

router.get('/:id', getSingle);

router.post('/', isAuthenticated, bookValidationRules, validate, addBook);

router.put('/:id', isAuthenticated, bookValidationRules, validate, updateBook);

router.delete('/:id', isAuthenticated, deleteBook);

module.exports = router;
