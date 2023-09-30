const router = require('express').Router();
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

router.post('/', memberValidationRules, validate, addMember);

router.put('/:id', memberValidationRules, validate, updateMember);

router.delete('/:id', deleteMember);

module.exports = router;
