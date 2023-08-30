const { LoanPayment } = require("./../models/loanPayment.model");
const jwt      = require("jsonwebtoken");

exports.create = async (req, res, next) => {
  const data = req.body;

  const encoded_token = req.headers["x-access-token"];
  var decoded_token   = jwt.verify(encoded_token, global.gConfig.jwt_secret);

  var payment = new LoanPayment ({
    "amount":       data.amount,
    "payment_type": data.payment_type,
    "payment_date": data.payment_date,
    "parent_loan":  data.parent_loan,
    "owner":        decoded_token.id
  });

  payment.save().then(async () => {
    return res.status(201).json({
    "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
    "code": 201,
    "status": "Success",
    "message": "Loan payment was successfully created."
    });
  });
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const payment = await LoanPayment.findById(id);
  payment.delete(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "Loan payment was successfully deleted."
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
      "message": "Loan payment was successfully updated."
    });
  });
};

exports.find = async (req, res, next) => {
  var options = {};
  var query   = {};

  options.limit = parseInt(req.query.limit) || 50;
  options.skip  = parseInt(req.query.skip)  || 0;

  const encoded_token = req.headers["x-access-token"];
  var decoded_token   = jwt.verify(encoded_token, global.gConfig.jwt_secret);

  if (req.query.orderBy) {
    options.sort = req.query.orderBy;
  }

  if (req.query.order) {
    if (req.query.order == "desc") {
      options.sort = "-" + req.query.orderBy;
    }
  }

  if (req.query.amount) {
    query["amount"] = req.amount;
  }

  if (req.query.payment_type) {
    query["payment_type"] = req.query.payment_type;
  }

  if (req.query.parent_loan) {
    query["parent_loan"] = req.query.parent_loan;
  }

  if (req.query.year) {
    query["payment_date"] = {
      $gte: `${req.query.year}-01-01`,
      $lte: `${req.query.year}-12-31`
    };
  }

    // Ensures that the API only provides dividend data to the certain user.
    query["owner"] = decoded_token.id;


  LoanPayment.find(query)
  .setOptions(options)
  .exec(function (err, loanPayments) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 500,
        "status": "Server Error",
        "message": "A problem occured when fetching loan payments."
      });
    } else {
      return res.status(200).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 200,
        "status": "Success",
        "filters": options,
        "documents": loanPayments.length,
        "data": loanPayments
      });
    }
  });
};
