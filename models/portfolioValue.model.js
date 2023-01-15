const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

var PortfolioValueSchema = new mongoose.Schema({
  value: {
    type:     Number,
    required: true,
    trim:     true
  },
  month: {
    type:     Number,
    required: true
  },
  year: {
    type:     Number,
    required: true
  },
  record_date: {
    type:     Date,
    required: true
  },
  owner: {
    type:     String,
    required: true,
    trim:     true
  }
});

PortfolioValueSchema.plugin(timestamp);

var PortfolioValue = mongoose.model('PortfolioValue', PortfolioValueSchema);
module.exports = { PortfolioValue };
