const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// define the schema for our user model
const userSchema = new Schema({
	"User ID": Number,
	"IP": String,
  "Geo": String,
  "Industry": String,
  "Company Size": String,
  "Campaign IDs": Object
})

module.exports = mongoose.model('User', userSchema)
