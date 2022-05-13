const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

var LoanSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  internal_reference: {
    type:     String,
    trim:     true,
  },
  creditor: {
    type:     String,
    trim:     true,
    required: true
  },
  debtor: {
    type:     String,
    trim:     true,
    required: true
  },
  amount: {
    type:     Number,
    required: true
  },
  interest_rate: {
    type:     Number,
    required: true
  },
  start_date: {
    type:     Date,
    required: true
  },
  end_date: {
    type:     Date,
    required: true
  },
  owner: {
    type:     String,
    required: true,
    trim:     true
  }
  isActive: {
    type:     Boolean,
    required: true,
    default:  true
  }
});

LoanSchema.plugin(timestamp);

var Loan = mongoose.model('Loan', LoanSchema);
module.exports = { Loan };
