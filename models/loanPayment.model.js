const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

var LoanPaymentSchema = new mongoose.Schema({
  amount: {
    type:     Number,
    required: true
  },
  payment_type: {
    type:     String,
    required: true,
    trim:     true
  },
  payment_date: {
    type:     Date,
    required: true
  },
  parent_loan: {
    type:     String,
    required: true,
    trim:     true
  },
  owner: {
    type:     String,
    required: true,
    trim:     true
  }
});

LoanPaymentSchema.plugin(timestamp);

var LoanPayment = mongoose.model('LoanPayment', LoanPaymentSchema);
module.exports = { LoanPayment };
