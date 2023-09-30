// eslint-disable-next-line node/no-unpublished-require
const { check, validationResult } = require('express-validator');

const bookValidationRules = [
  check('title', 'The book title is required.').notEmpty(),
  check('author', 'The author name is required.').notEmpty(),
  check('genre', 'The genre of the book is required.').notEmpty(),
  check('publication_year', 'The publication year of the book is required.').notEmpty(),
  check('isbn', 'isbn is not an ISBN').isISBN({ version: 13 }),
  check('available_copies', 'Available copies is not a number').isNumeric(),
  check('description', 'The description of the book is required.').notEmpty()
];

const memberValidationRules = [
  check('name', 'The name of the member is required').notEmpty(),
  check('email', 'Email is not a valide e-mail address').isEmail(),
  check('membership_type', 'The type membership is required').notEmpty()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  bookValidationRules,
  memberValidationRules,
  validate
};
