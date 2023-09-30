const router = require('express').Router();
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

router.post('/', bookValidationRules, validate, addBook);

router.put('/:id', bookValidationRules, validate, updateBook);

router.delete('/:id', deleteBook);

module.exports = router;
