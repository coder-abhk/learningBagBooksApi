const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.DB;
const PASS = process.env.PASS;

// connection uri for mongodb
const uri = `mongodb+srv://coder-abhk:${PASS}@cluster0.tsmwf.mongodb.net/${DB}?retryWrites=true&w=majority`;

// mongodb client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedtopology: true,
});

module.exports = client;
