const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for our user model
const campaignSchema = new Schema({
	"Campaign ID": String,
	"Identifier": Object,
  "Users": Array,
  "Priority": String,
	"ImagePath": String
})

module.exports = mongoose.model('Campaign', campaignSchema)
