const { ObjectId } = require('mongodb');
const db = require('../database/database');

const getAll = async (req, res, next) => {
  // #swagger.tags=['Books']
  // #swagger.description = 'Endpoint to get all Books'
  try {
    const books = await db.getDb().collection('books').find({}).toArray();

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags=['Books']
  // #swagger.description = 'Endpoint to get a specific Book'
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json('Must use a valid book id to find a book');
  }

  try {
    const book = await db
      .getDb()
      .collection('books')
      .findOne({ _id: new ObjectId(id) });

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  // #swagger.tags=['Books']
  // #swagger.description = 'Endpoint to create a specific Book'
  /*  
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Add a book',
    required: true,
    schema: {
      $title: 'The Daily Stoic',
      $author: 'Ryan Holiday',
      $genre: 'Philosophy',
      $publication_year: '2016',
      $isbn: '978-0-7352-1173-5',
      $available_copies: 10,
      $description: 'It is about stoicism, an ancient philosophy teaching people how to live a good life'
    } 
  } 
  */
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publication_year: req.body.publication_year,
    isbn: req.body.isbn,
    available_copies: req.body.available_copies,
    description: req.body.description
  };

  try {
    const response = await db.getDb().collection('books').insertOne(book);

    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating book');
    }
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  // #swagger.tags=['Books']
  // #swagger.description = 'Endpoint to update a specific Book'
  /*  
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Add a Book',
    required: true,
    schema: {
      $title: 'Company of One',
      $author: 'Paul Jarvis',
      $genre: 'Business',
      $publication_year: 2018,
      $isbn: '978-1-9848-5836-8',
      $available_copies: 20,
      $description: 'A book about the self-employment revolution'
    } 
  } 
  */
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json('Must use a valid book id to update a book');
  }

  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publication_year: req.body.publication_year,
      isbn: req.body.isbn,
      available_copies: req.body.available_copies,
      description: req.body.description
    };

    const response = await db
      .getDb()
      .collection('books')
      .updateOne({ _id: new ObjectId(id) }, { $set: book });

    if (response.acknowledged && response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || `Some error ocurred while updating book with id ${id}`);
    }
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  // #swagger.tags=['Books']
  // #swagger.description = 'Endpoint to delete a specific Book'
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json('Must use a valid book id to delete a book');
  }

  try {
    const response = await db
      .getDb()
      .collection('books')
      .deleteOne({ _id: new ObjectId(id) });

    if (response.acknowledged && response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || `Some error ocurred while deleting book with id ${id}`);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getSingle, addBook, updateBook, deleteBook };
