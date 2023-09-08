const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

var StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ticker: {
    type:     String,
    required: true,
    trim:     true,
    unique:   true
  },
  companyInfo: {
    industry: {
      type:     String,
      required: true,
      trim:     true
    },
    identifier: {
      type:     String,
      required: true,
      trim:     true
    },
    logo: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  financial: {
    currency: {
      type:     String,
      required: true,
      trim:     true
    },
    isTaxExempt: {
      type: Boolean,
      required: true
    }
  },
  isActive: {
    type:     Boolean,
    required: true,
    default:  true
  }
});

StockSchema.plugin(timestamp);

var Stock = mongoose.model('Stock', StockSchema);
module.exports = { Stock };
