const { Loan } = require("./../models/loan.model");
const jwt      = require("jsonwebtoken");

exports.create = async (req, res, next) => {
  const data = req.body;

  const encoded_token = req.headers["x-access-token"];
  var decoded_token   = jwt.verify(encoded_token, process.env.JWT_SECRET);

  var loan = new Loan ({
    "description":            data.description,
    "internal_reference":     data.internal_reference,
    "creditor":               data.creditor,
    "debtor":                 data.debtor,
    "principal_amount":       data.principal_amount,
    "interest_rate":          data.interest_rate,
    "start_date":             data.start_date,
    "end_date":               data.end_date,
    "owner":                  decoded_token.id,
    "isActive":               true
  });

  loan.save().then(async () => {
    return res.status(201).json({
    "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
    "code": 201,
    "status": "Success",
    "message": "Loan was successfully created."
    });
  });
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const loan = await Loan.findById(id);
  loan.delete(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Loan was successfully deleted."
    });
  });
};

exports.patch = async (req, res, next) => {
  const id   = req.params.id;
  const data = req.body;

  Loan.findOneAndUpdate({ _id: id }, data).then(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Loan was successfully updated."
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

  if (req.query.internal_reference) {
    query["internal_reference"] = req.internal_reference;
  }

  if (req.query.creditor) {
    query["creditor"] = req.query.creditor;
  }

  if (req.query.debtor) {
    query["debtor"] = req.query.debtor;
  }

  if (req.query.isActive) {
    query["isActive"] = req.query.isActive;
  }

    // Ensures that the API only provides dividend data to the certain user.
    query["owner"] = decoded_token.id;


  Loan.find(query)
  .setOptions(options)
  .exec(function (err, loans) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 500,
        "status": "Server Error",
        "message": "A problem occured when fetching loans."
      });
    } else {
      return res.status(200).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 200,
        "status": "Success",
        "filters": options,
        "documents": loans.length,
        "data": loans
      });
    }
  });
};
