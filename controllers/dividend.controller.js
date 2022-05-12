const { Dividend } = require("./../models/dividend.model");
const jwt          = require("jsonwebtoken");
const config       = require('./../config/config.js');

exports.create = async (req, res, next) => {
  const data = req.body;

  const encoded_token = req.headers["x-access-token"];
  var decoded_token   = jwt.verify(encoded_token, global.gConfig.jwt_secret);

  var dividend = new Dividend ({
    "ticker":            data.ticker,
    "transacted_units":  data.transacted_units,
    "dividend_per_unit": data.dividend_per_unit,
    "exchange_rate":     data.exchange_rate,
    "withholding_tax":   data.withholding_tax,
    "currency":          data.currency,
    "frequency":         data.frequency,
    "share_price":       data.share_price,
    "payment_date":      data.payment_date,
    "owner":             decoded_token.id
  });

  dividend.save().then(async () => {
    return res.status(201).json({
    "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
    "code": 201,
    "status": "Success",
    "message": "Dividend was successfully registered."
    });
  });
};
