const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

var DividendSchema = new mongoose.Schema({
  ticker: {
    type:     String,
    required: true,
    trim:     true
  },
  transacted_units: {
    type:     Number,
    required: true
  },
  dividend_per_unit: {
    type:     Number,
    required: true
  },
  exchange_rate: {
    type:     Number,
    required: true
  },
  withholding_tax: {
    type:     Number,
    required: true
  },
  currency: {
    type:     String,
    required: true,
    trim:     true
  },
  frequency: {
    type:     Number,
    required: true
  },
  share_price: {
    type:     Number,
    required: true
  },
  payment_date: {
    type:     Date,
    required: true
  },
  payment_type: {
    type: String,
    required: true
  },
  isExempt: {
    type: Boolean,
    required: true
  },
  owner: {
    type:     String,
    required: true,
    trim:     true
  }
});

DividendSchema.plugin(timestamp);

var Dividend = mongoose.model('Dividend', DividendSchema);
module.exports = { Dividend };
