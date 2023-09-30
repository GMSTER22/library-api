// eslint-disable-next-line node/no-missing-require
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../config/index');
const uri = config.databaseURL;

let connection;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

const initDb = async (callback) => {
  if (connection) return callback(null, connection);

  try {
    // Connect the client to the server	(optional starting in v4.7)
    connection = await client.connect();

    console.log('Connection with MongoDB established');

    return callback(null, connection);
  } catch (error) {
    callback(error);
    console.log(error);
  }
};

const getDb = () => {
  if (!connection) throw Error('connection not established with mongodb');

  return connection.db();
};

module.exports = {
  initDb,
  getDb
};
