const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.CONNECT_LINK)
    .then((client) => {
      _db = client.db();
      console.log("Connected successfully to server");
      callback(client);
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No db found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
