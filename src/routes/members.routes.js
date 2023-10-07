const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authenticate');
const { memberValidationRules, validate } = require('../helpers/validate');
const {
  getAll,
  getSingle,
  addMember,
  updateMember,
  deleteMember
} = require('../controllers/members.controllers');

router.get('/', getAll);

router.get('/:id', getSingle);

router.post('/', isAuthenticated, memberValidationRules, validate, addMember);

router.put('/:id', isAuthenticated, memberValidationRules, validate, updateMember);

router.delete('/:id', isAuthenticated, deleteMember);

module.exports = router;
