const { PortfolioValue } = require("./../models/portfolioValue.model");
const jwt          = require("jsonwebtoken");

exports.create = async (req, res, next) => {
  const data = req.body;

  const encoded_token = req.headers["x-access-token"];
  var decoded_token   = jwt.verify(encoded_token, process.env.JWT_SECRET);

  var month = data.month;
  var year  = data.year;
  var date = new Date(year, month, 0);

  var portfolioValue = new PortfolioValue({
    "value":       data.value,
    "month":       month,
    "year":        year,
    "record_date": date,
    "owner":       decoded_token.id
  });

  portfolioValue.save().then(async () => {
    return res.status(201).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 201,
      "status": "Success",
      "message": "Portfolio Value was successfully registered."
    });
  });
}

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const portfolioValue = await PortfolioValue.findById(id);
  dividend.delete(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Portfolio Value was successfully deleted."
    });
  });
};

exports.patch = async (req, res, next) => {
  const id   = req.params.id;
  const data = req.body;

  PortfolioValue.findOneAndUpdate({ _id: id }, data).then(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Portfolio Value was successfully updated."
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

  if (req.query.value) {
    query["value"] = req.query.value;
  }

  if (req.query.month) {
    query["month"] = req.query.month;
  }

  if (req.query.year) {
      query["year"] = req.query.year;
  }

    // Ensures that the API only provides dividend data to the certain user.
    query["owner"] = decoded_token.id;


  PortfolioValue.find(query)
  .setOptions(options)
  .exec(function (err, values) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 500,
        "status": "Server Error",
        "message": "A problem occured when fetching portfolio values."
      });
    } else {
      return res.status(200).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 200,
        "status": "Success",
        "filters": options,
        "documents": values.length,
        "data": values
      });
    }
  })

};
