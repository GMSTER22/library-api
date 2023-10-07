const { ObjectId } = require('mongodb');
const db = require('../database/database');

const getAll = async (req, res, next) => {
  // #swagger.tags=['Members']
  // #swagger.description = 'Endpoint to get all Members'
  try {
    const members = await db.getDb().collection('members').find({}).toArray();

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags=['Members']
  // #swagger.description = 'Endpoint to get a specific Member'
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json('Must use a valid member id to find a member');
  }

  try {
    const member = await db
      .getDb()
      .collection('members')
      .findOne({ _id: new ObjectId(id) });

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

const addMember = async (req, res, next) => {
  // #swagger.tags=['Members']
  // #swagger.description = 'Endpoint to create a specific Member'
  /*  
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Add a Member',
    required: true,
    schema: {
      $name: 'Mike Bailey',
      $email: 'mike.bailey@example.com',
      $membership_type: 'Student',
      $books_borrowed: []
    } 
  } 
  */
  /* #swagger.security = [{
      "oAuthSample": [
        "write_members"
      ]
  }] */
  const member = {
    name: req.body.name,
    email: req.body.email,
    join_date: new Date(),
    membership_type: req.body.membership_type,
    books_borrowed: []
  };
  try {
    const response = await db.getDb().collection('members').insertOne(member);

    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while adding member');
    }
  } catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  // #swagger.tags=['Members']
  // #swagger.description = 'Endpoint to update a specific Member'
  /*  
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Add a Member',
    required: true,
    schema: {
      $name: 'Victor Hugo',
      $email: 'victor.hugo@gmail.com',
      $membership_type: 'Administration',
      $books_borrowed: []
    } 
  } 
  */
  /* #swagger.security = [{
      "oAuthSample": [
        "write_members"
      ]
  }] */
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json('Must use a valid member id to update a member');
  }

  const member = {
    name: req.body.name,
    email: req.body.email,
    membership_type: req.body.membership_type,
    books_borrowed: []
  };

  try {
    const response = await db
      .getDb()
      .collection('members')
      .updateOne({ _id: new ObjectId(id) }, { $set: member });

    if (response.acknowledged && response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || `Some error ocurred while updating member with id ${id}`);
    }
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (req, res, next) => {
  // #swagger.tags=['Members']
  // #swagger.description = 'Endpoint to delete a specific Member'
  /* #swagger.security = [{
      "oAuthSample": [
        "write_members"
      ]
  }] */
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json('Must use a valid member id to delete a member');
  }

  try {
    const response = await db
      .getDb()
      .collection('members')
      .deleteOne({ _id: new ObjectId(id) });

    if (response.acknowledged && response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || `Some error ocurred while deleting member with id ${id}`);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getSingle, addMember, updateMember, deleteMember };
