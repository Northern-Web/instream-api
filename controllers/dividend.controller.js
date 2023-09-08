const { Dividend } = require('./../models/dividend.model');
const { Stock }    = require('./../models/stock.model')
const jwt          = require("jsonwebtoken");

exports.create = async (req, res, next) => {
  const data = req.body;

  const encoded_token = req.headers["x-access-token"];
  var decoded_token   = jwt.verify(encoded_token, process.env.JWT_SECRET);
  
  var stock = await Stock.findOne({'ticker': data.ticker});


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
    "payment_type":      data.payment_type,
    "isTaxExempt":       stock.financial.isTaxExempt,
    "owner":             decoded_token.id
  });

  dividend.save().then(async () => {
    return res.status(201).json({
    "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
    "code": 201,
    "status": "Success",
    "message": "Dividend was successfully registered."
    });
  });
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const dividend = await Dividend.findById(id);
  dividend.delete(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Dividend was successfully deleted."
    });
  });
};

exports.patch = async (req, res, next) => {
  const id   = req.params.id;
  const data = req.body;

  Dividend.findOneAndUpdate({ _id: id }, data).then(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Dividend was successfully updated."
    });
  });
};

exports.find = async (req, res, next) => {
  var options = {};
  var query   = {};

  options.limit = parseInt(req.query.limit) || 50;
  options.skip  = parseInt(req.query.skip)  || 0;

  const encoded_token = req.headers["x-access-token"];
  var decoded_token   = jwt.verify(encoded_token, process.env.JWT_SECRET);

  if (req.query.orderBy) {
    options.sort = req.query.orderBy;
  }

  if (req.query.order) {
    if (req.query.order == "desc") {
      options.sort = "-" + req.query.orderBy;
    }
  }

  if (req.query.ticker) {
    query["ticker"] = req.query.ticker;
  }

  if (req.query.currency) {
    query["currency"] = req.query.currency;
  }

  if (req.query.year) {
    query["payment_date"] = {
      $gte: `${req.query.year}-01-01`,
      $lte: `${req.query.year}-12-31`
    };
  }

    // Ensures that the API only provides dividend data to the certain user.
    query["owner"] = decoded_token.id;


  Dividend.find(query)
  .setOptions(options)
  .exec(function (err, dividends) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 500,
        "status": "Server Error",
        "message": "A problem occured when fetching dividends."
      });
    } else {
      return res.status(200).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 200,
        "status": "Success",
        "filters": options,
        "documents": dividends.length,
        "data": dividends
      });
    }
  })

};
