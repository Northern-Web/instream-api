const { Stock } = require("./../models/stock.model");
const config    = require('./../config/config.js');

exports.create = async (req, res, next) => {
  const data = req.body;

  var stock = new Stock ({
    "name":                   data.name,
    "ticker":                 data.ticker,
    "companyInfo.industry":   data.industry,
    "companyInfo.identifier": data.identifier,
    "companyInfo.logo":       data.logo,
    "companyInfo.website":    data.website,
    "financial.currency":     data.currency,
    "isActive":               true

  });

  stock.save().then(async () => {
    return res.status(201).json({
    "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
    "code": 201,
    "status": "Success",
    "message": "Stock was successfully created."
    });
  });
};

exports.get = async (req, res, next) => {
  var options = {};
  var query   = {};

  options.limit = parseInt(req.query.limit) || 50;
  options.skip  = parseInt(req.query.skip)  || 0;

  if (req.query.orderBy) {
    options.sort = req.query.orderBy;
  }

  if (req.query.order) {
    if (req.query.order == "desc") {
      options.sort = "-" + req.query.orderBy;
    }
  }

  if (req.query.name) {
    query["name"] = req.query.name;
  }

  if (req.query.ticker) {
    query["ticker"] = req.query.ticker;
  }

  if (req.query.industry) {
    query["companyInfo.industry"] = req.query.industry;
  }

  if (req.query.identifier) {
    query["companyInfo.identifier"] = req.query.identifier;
  }

  if (req.query.currency) {
    query["financial.currency"] = req.query.currency;
  }

  Stock.find(query)
  .setOptions(options)
  .exec(function (err, stocks) {
    if (err) {
      return res.status(500).json({
        "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
        "code": 500,
        "status": "Server Error",
        "message": "A problem occured when fetching stocks."
      });
    } else {
      return res.status(200).json({
        "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
        "code": 200,
        "status": "Success",
        "filters": options,
        "documents": stocks.length,
        "data": stocks
      });
    }
  })
}
