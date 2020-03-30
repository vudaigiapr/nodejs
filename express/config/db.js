//connect db lowdb
var low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json')
//connect db lowdb
var db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write()
  module.exports = db;