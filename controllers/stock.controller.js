const { Stock } = require("./../models/stock.model");

exports.create = async (req, res, next) => {
  
  try {
    const data = req.body;

    var stock = new Stock ({
      "name":                   data.name,
      "ticker":                 data.ticker,
      "companyInfo.industry":   data.industry,
      "companyInfo.identifier": data.identifier,
      "companyInfo.logo":       data.logo,
      "companyInfo.website":    data.website,
      "financial.currency":     data.currency,
      "financial.isTaxExempt":  (data.exempt == true || data.exempt === 'true' ? true : false),
      "isActive":               true
  
    });

    var existingStock = await Stock.findOne({'ticker': data.ticker});
    if (existingStock){
      return res.status(409).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 409,
        "status": "Error",
        "message": "Stock has already been created."
        });
    }
  
    stock.save().then(async () => {
      return res.status(201).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 201,
      "status": "Success",
      "message": "Stock was successfully created."
      });
    });

  } catch(error) {
    return res.status(500).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 500,
      "status": "Error",
      "message": error.message
      });
  }

};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const stock = await Stock.findById(id);
  stock.delete(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Stock was successfully deleted."
    });
  });
};

exports.patch = async (req, res, next) => {
  const id   = req.params.id;
  const data = req.body;

  Stock.findOneAndUpdate({ _id: id }, data).then(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Stock was successfully updated."
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

  if (req.query.taxExempt) {
    query["financial.isTaxExempt"] = req.query.taxExempt;
  }

  if (req.query.active) {
    query["isActive"] = req.query.active;
  }

  Stock.find(query)
  .setOptions(options)
  .exec(function (err, stocks) {
    if (err) {
      return res.status(500).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 500,
        "status": "Server Error",
        "message": "A problem occured when fetching stocks."
      });
    } else {
      return res.status(200).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 200,
        "status": "Success",
        "filters": options,
        "documents": stocks.length,
        "data": stocks
      });
    }
  })
}
